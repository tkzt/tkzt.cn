---
title: 一篇 Get Started 文章
date: 2024-05-02
---

最近车间来了些新同事，作为老油条为组里一个主要后端项目写了个 `Get Started` 文档。但是按照一些个人经验，这篇文章最后会鲜有人问津，为了挽救其中的一些心血（主要是一些无聊的小幽默），准备在个人博客里贴一下。

过程中，一个没忍住把主页修缮了些许。主要更新：

- 没忍住还是上 NuxtJS 了
- 一些技术无关的文章放在主页网站里，其他则留在 [N Notes](https://n-notes.tkzt.cn/)
- 抄袭托尼老师的一些设计

## Get Started


>[!Work in Progress]
>Feel free to challenge and/or enrich the following list 

###  Local development

#### Commit Configuration

First of everything, there is no doubt:

- clone the REPO

```bash
git clone https://eaglelab-gitlab.tcljd.com/cloudplatform/turing/platform/turing-backend.git
```

Then:

- configure your commit email as the `tcl.com` suffixed one
- pick one charming commit name (e.g. `Emilien·Vanderbroucke`)
- create one python virtual environment (with python version >= 3.9) and activate it

After that, out of reducing mental burden consideration, we super extremely recommend you to install `pre-commit` and related hooks (老法师[^1] please ignore):

```bash
pip install -r requirements_sca.txt && pre-commit install
```

Or else, you may fail at the first time you try to deploy. Just like this Pangpanglong:

![PangpanglongFailedAtFirstDeployment](/PangpanglongFailedAtFirstDeployment.png)

#### Starting local service

The `.env` file to start-local-service is just like what Jarvis to Tony Stark. To easily have one:

```bash
cp .env.example .env
```

Then, we need to configure some essential variables in `.env`:

- **API_ACCESS_KEY** - An admin token, used to skip authentication locally
- **ENVIRONMENT** - A [symbol](#dev-environment-setup) like `kata` (from kang1.tao), `juga` (from junxin.gao)

Now then, you can run with `docker-compose`, which is a recommended way to start local service:

```bash
docker compose up -d
```

Or else, if you want to run the whole FastAPI app total locally (i.e. run directly with `python src/main.py` in IDE or somewhere else), these DB endpoint related env variables below also need to be set:

- OPEN_SEARCH_ENDPOINT 
- REDIS_URI
- POSTGRES_DB_URI

As you can see, each of them has a straightforward name. What has to be mentioned here is, we can get access to OpenSearch and PostgreSQL service by bastion linux with fixed IP[^2].

To be more specific, we can sign in the bastion hosts via SSH tunnel using PEM certificates, and then we can forward those service to certain port of `localhost`.

A workable ssh config (the AWS region is cn-north-1, and IPs & VPC endpoints are valid at this moment (2024/04/18)):

```
Host opensearch-dev
  HostName 54.222.141.188
  User ec2-user
  IdentitiesOnly yes
  IdentityFile ~/.ssh/credentials/os-dev-cn.pem
  LocalForward 9210 vpc-dev-doc-chatbot-db-***.cn-north-1.es.amazonaws.com.cn:80
  
Host opensearch-test
  HostName 71.132.19.167
  User ec2-user
  IdentitiesOnly yes
  IdentityFile ~/.ssh/credentials/os-test-cn.pem
  LocalForward 9211 vpc-test-doc-chatbot-db-***.cn-north-1.es.amazonaws.com.cn:80

Host opensearch-live
  HostName 52.80.58.35
  User ec2-user
  IdentitiesOnly yes
  IdentityFile ~/.ssh/credentials/os-live-cn.pem
  LocalForward 9212 vpc-live-doc-chatbot-db-***.cn-north-1.es.amazonaws.com.cn:80

Host postgres-dev
  HostName 54.222.141.188
  User ec2-user
  IdentitiesOnly yes
  IdentityFile ~/.ssh/credentials/os-dev-cn.pem
  LocalForward 9502 devdocumentchatbotdb-***.rds.cn-north-1.amazonaws.com.cn:5432

Host postgres-test
  HostName 71.132.19.167
  User ec2-user
  IdentitiesOnly yes
  IdentityFile ~/.ssh/credentials/os-test-cn.pem
  LocalForward 9501 testdocumentchatbotdb-***.rds.cn-north-1.amazonaws.com.cn:5432

Host postgres-live
  HostName 52.80.58.35
  User ec2-user
  IdentitiesOnly yes
  IdentityFile ~/.ssh/credentials/os-live-cn.pem
  LocalForward 9500 livedocumentchatbotdb-***.rds.cn-north-1.amazonaws.com.cn:5432
```

For example, run cmd below to sign in the bastion linux:

```bash
ssh opensearch-dev
```

then visit `http://localhost:9210/_dashboards`, a page like this will show up:

![OpenSearchDashboards](/OpenSearchDashboards.png)

Similar for PostgreSQL, once you signing in, an uri like `postgresql+asyncpg://turing:turing@localhost:9502/turing_skills` will be valid. And by the way, `username` and `password` and `database name` of any remote PG can be retrieved from [AWS Secret Manager](fake_link).

As for retrieving all of these certificates, better call `juga`.

#### Dev environment setup

Every member of our team has one personal dev environment, represented by a special symbol like `juga`, which is from your TCL OA account (i.e. `junxin.gao`). 

And the environment is mainly consist of:

- An independent AWS Fargate task definition
- A series of endpoint configurations
  - Cloudfront & Route 53 - To configure a public network accessible endpoint like `juga-turing.cn.llm.tcljd.com`, which will be the API base URI of your dev environment
  - S3 - Its name is a string like `juga-turing-web` (Yes, your bucket for everything!)

To setup the Fargate task, please refer to the following steps:

>[!Premises]
>- AWS CLI having been installed (c.f. [the official doc](https://aws.amazon.com/cn/cli/)) and well configured (i.e. region & [access-name & access-key](fake_link)
>- Terraform having been installed (c.f. [the official doc](https://developer.hashicorp.com/terraform/install))

1. Trigger any `_import_dev_data` suffixed pipeline [here](fake_link) to initialize your config-manager
2. Follow steps [here](fake_link) to initialize your S3 bucket

![TriggerConfigManager](/TriggerConfigManager.png)

3. Append your symbol to the array of line 111 (may change) of this file `infrastructure/bin/infrastructure.ts` and line 184 (may change) of this file `infrastructure/lib/infrastructure-stack.ts`
4. After finishing all above, you can take a try with a **harmless and useless branch**:

```
git add . && git commit -m "chore: first try at TURING" && git push origin head:tmp/whatever
```

The `cn_deploy_personalized` pipeline will be automatically triggered, and if you are lucky enough, your first deployment will succeed except for a few e2e test failures. It will take less than 20mins to run the whole pipeline (yep, a little bit annoying to wait for so long, that's a result of limited resources for personal environments). 

If it takes longer time, unfortunately your FastAPI app may fail to start up due to your newly added codes. Under this circumstance, you can visit our old friend [AWS Cloud Watch](fake_link) to try to figure it out:

- select the log group containing your symbol
- select the latest log stream containing `default` (another `ingest` one is used for ingesting, steady as hell, seldom crashed)

![CloudWatchOne](/CloudWatchOne.png)

![CloudWatchTwo](/CloudWatchTwo.png)

#### Updating Image

Generally speaking, we seldom need to update image used in `Fargate` task, however, the situation sometimes happens that we introduce new features which require new third party packages. At that time, we should:

- make sure your aws-cli env configured properly firstly
- then login to ecr with:

```bash
aws ecr get-login-password --region cn-north-1 | docker login --username AWS --password-stdin ***.dkr.ecr.cn-north-1.amazonaws.com.cn/document-chatbot-base
```

- then update base_image/requirements_docker.txt
- then update the image name to a string like document-chatbot-base:20240319-thepackagename
- then cd into the directory base_image and execute cmd below to build and push the new image:

```bash
./deploy_base_image.sh
```
- then update image used in both `Dockerfile-cn-north-1` (similarly, update `Dockerfile-ap-southeast-1` after pushing to `ap-southeast-1`)

### Testing

We use `pytest` for end-to-end and unit testing. 

#### Local Testing

To start:

```bash
pip install -r requirements_e2e.txt
```

##### End-to-end

Each time you finish one API, we strongly recommend you to add some test cases to `tests/e2e`.

After, run:

```
pytest -v -s tests/e2e/test_cases_for_your_api.py
```

Then you can get acquainted with bugs that you meticulously crafted.

##### Unit Test

Similar with end-to-end test, sometimes we may add some generic modules may used by more than one API. Unit tests are required at this circumstance. The directory is `tests/units`.

#### Cloud Testing

During the `dev` deploying pipeline, after every success deployment, an end-to-end testing stage will be automatically triggered. And for `test` and `live`, the e2e stage need to be triggered manually.

As for the unit test, for some reasons, it is now (2024/04/19) [under construction](fake_link).

### DB Related

#### Alembic Conflicts Solving

We use `alembic` to control DB revisions.

It usually happens the situation that table structure (or existence) updated by two different people at the same time. Then we have to solve the **alembic conflicts manually**.

The versions in Alembic must have a linear relationship. If two developers are both working based on version A, and they separately add versions A1 and A2 after version A, assuming version A1 is merged into the main branch first. Then the other developer, after pulling code containing A1, needs to manually adjust a little bit.

Generally speaking, steps to kill conflict would be:

1. If your changes has been applied to db, goto `2`, or else goto `3`
2. Downgrade your dev db (which is named like `turing_skills_kata`) as following:
  - For remote (i.e. your remote personal db)
    1. Stop your local `turing-backend` service (assuming you're using docker-compose locally and your service is running) with `docker compose down turing-backend`
    2. Sign to the dev bastion linux of PostgreSQL and [local forward service related](#starting-local-service)
    3. **Temporarily** update the `POSTGRES_DB_URI` variable in your `.env` to something like `postgresql+asyncpg://turing:***@host.docker.internal:9502/turing_skills`
      - `***` represents db password which can be found in secret manager
      - Please keep the db name `turing_skills`
    4. **Temporarily** update the `command` of `turing-backend` service in `docker-compose.yml` to `"sh -c 'uvicorn main:app --host 0.0.0.0 --port 80 --reload'"`
    5. Start your service with `docker compose up -d turing-backend`, and wait for ready (through logs: `docker logs -f turing-backend`, and usually ends with an info containing _poll_task poll_task end in xxx seconds_ )
    6. `docker exec -it turing-backend bash`
    7. Downgrade it! (with `alembic downgrade A`, and note that your destination is A **NOT** A2)
    8. Down your service again, and revert your `docker-compose.yml` to initial
  - For local
    1. Same with `1` above
    2. Whether existing data matters
        - True, act similarly with following in `For remote` (but don't have to change `POSTGRES_DB_URI`)
        - False, drop your whole database (whose name is like `turing_skills_kata`), and goto `3`
3. Update `down_revision` in your alembic version file (i.e. A2) to the hash of A1 to make it linear again. Sketch map on `before` and `After`:
![AlembicConflict](/AlembicConflictSolving.png)
4. Run `docker compose up -d turing-backend`, and wait for ready.

### Merge Request

Every new feature considered for merging to the main branch, need to be reviewed first.

#### MR Conventions

- Keep Merge Requests small.
- Say < 500 lines of code.
- It is much harder to make sense of any larger MR, taking a long time to review and limiting the benefits of the code review process.
- Don't forget to include tests, to showcase the main use-cases of your new feature
- Please get at least one Approval from a senior team member before merging 

#### Code Review

There are two famous reviewers in our team: `frederic.fillieux` and `junxin.gao`. 

Here's a lovely loop:

- Please let the reviewer you prefer reviewing your code (or more available) know, once your MR is ready
- The reviewer may create a few threads to discuss and improve your code
- Or else you get an approval. **BREAK LOOP**
- You should solve those threads one by one with heart

### Test and Live Deployment

#### Test

Once your code has been reviewed and has received an approval, you can merge your feature branch to the main, which will later trigger a test env deploying pipeline similar with personal env deploying. But the difference is, for test deployment, the pipeline only execute static code checking and build new image, you need to **manually click on** the deploy button.

#### Live

After your feature has been proofed as workable, you can consider applying for deploying to live environment. To avoid chaos, deploying to live is only open to limited people (e.g. **juga (junxin.gao)**).

Those limited people will act like below to trigger deploying to live:

- Create a new tag with essential description and unified version name [here](fake_link)
- Wait for the success of static code checking and image building
- Hit the deploy button firmly
- Wait for the success of deploying
- Check whether everything works like a charm

### Hotfixes

Sometimes there might be some hotfixes needed to be deployed urgently. You should act like:

- Create one branch with a name like release/hot-fix-[your-issue]
- On the premise of ensuring everything is safe and sound, create one release tag just like `turing_v0.3.1.1` (saying the precious version is v0.3.1)
- One deployment to live environment will be triggered, just like [normal live deploying](#live)

<br>

\-

[^1]: High level player
[^2]: Elastic Ip Address, Also called [EIP](fake_link)

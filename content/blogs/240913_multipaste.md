---
title: "Multipaste: 一个朴素的剪切板管理工具"
date: 2024-09-13
---

## Win+V

很久以前（其实也没有很久），像任何一个 Windows 转 MacOS 的人一样，当我告别那台陪伴我五年多的 HP Pavilion 老伙计，初体验 MacOS 时，对一切感到新奇之余，难免怀念一些 Windows 上的工具、操作，`win`+ `v` 呼出的自带剪切板管理便是其中之一。当时在搜寻、体验了若干三方工具，难以满足后，便有了自行抄袭一个想法。

但由于懒惰，很长一段时间内，项目进度停留在 _完成目录创建_ 这一步，心仪的实现方案也随着科技人文的发展、个人知识水平（以及偏见）的提高，从 `electron`到 `pywebview`再到 `tauri`。

## Rustup

事实上，到今年 1 月左右时，进度已经推进到 _完成 REPO 创建（手动狗头）_，迟迟没有动手吃螃蟹，主要是因为觉得 🦀 吃起来太过麻烦。

直到 3 月底，本着~~少~~中年当自强的心态，在代码厨房开源松 Sprint 4 上接了个 FnckSQL(基于 Rust 的数据库) 的[任务](https://codekitchen.community/t/topic/1286)。在又一次通过官网文档入门该语言后，终于完成任务。

![first_to_eat_crab.png](/first_to_eat_crab.png)

是的，Rust 不过如此（没有没有🙂‍↔️😅）。是时候开发此剪切板管理工具了。

## 基本功能

首先，这个工具将有一个朴素的名字，比如 **Multipaste**。

其次，这个工具将有一个图标。在 UCL 大佬 [Henry Zhu](https://www.instagram.com/henryz97222?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==) 的悉心指导下，一个~~好看的~~图标诞生了：

![multipaste_logo.png](/multipaste_logo.png)

再次，由于一些个人偏见，这个小工具将非常简单，是且仅是一个剪切板管理工具：

+ 仅支持文本、图片两种剪切板记录类型
+ 对于文本记录可根据关键词进行过滤
+ UI 仅包含一个搜索框和记录列表
+ 每个记录可以删除、置顶
+ 半透明背景效果
+ 启动后藏在任务栏里
+ 有一些简单的配置项

## 实现

这个工具最终大概长这样：

<iframe src="//player.bilibili.com/player.html?aid=113429197230190&bvid=BV1scDaYcEeA&cid=26625444150&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="500" height="300"></iframe>

主要包括三个部分：

+ UI 展示（以及 Tauri Commands）
+ 剪切板状态检测模块
+ 记录存储、筛选模块

UI 部分主要基于: [UnoCSS](https://unocss.dev/)、[VueUse](https://vueuse.org/)、[PerfectScrollbar](https://www.npmjs.com/package/perfect-scrollbar)、[window-vibrancy](https://github.com/tauri-apps/window-vibrancy)（半透明效果）。

剪切板状态检测基于 [clipboard-rs](https://github.com/ChurchTao/clipboard-rs)。

存储部分，基于 [Rusqlite](https://github.com/rusqlite/rusqlite)、[r2d2](https://github.com/sfackler/r2d2) 以及 [Diesel](https://github.com/diesel-rs/diesel)。其中一部分逻辑~~抄袭~~参考了 [PasteBar](https://github.com/PasteBar/PasteBarApp)。

此外，对于跨平台框架来说，MacOS 开放的窗口 API 有限，所以绝大多数窗口操作都通过 **[Accessibility](https://github.com/eiz/accessibility)** 接口。也因此，获取光标输入位置变得很困难，在尝试~~无数~~多次未果后，最终将剪切板记录列表的呼出位置，设置成更 MacOS Style 的居中位置。而点击某条记录触发的自动粘贴，基于 [enigo](https://github.com/enigo-rs/enigo)，所以在打开应用前需要手动将 Multipaste 添加到设置的 _隐私与安全性 -> 辅助功能_ 的启用列表里。 

另外，点击任务栏图标会弹出一个简单的设置窗口，目前了仅放了**最大记录数**、**是否开机自启动**两个设置项。

再外，恰如 Windows 上 `Win` + `V` 呼出列表，Multipaste 的剪切板记录目前通过 `Ctrl` + `V` 呼出，后继也许可以改成一个配置项。

## 最后

很显然，这个工具还存在很多可以优化、迭代的地方，于是 GitHub 创建的第一个 [Release](https://github.com/tkzt/multipaste/releases/tag/v0.1.0) 对应的 Tag 是 `v0.1.0`。

欢迎各种形式的共建。

传送门：[multipaste](https://github.com/tkzt/multipaste)。

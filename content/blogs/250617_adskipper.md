---
title: "Adskipper: 广告退散"
date: 2025-06-06
---

最近（由于懒惰，最终写完这篇博客已经是 23 号了，可能只能算“较近”）WFH 的次数越来越多，高效工作 :dog: 之余在某个飘着广告、广为流传的视频网站把[《黄石》](https://movie.douban.com/subject/27036727/)三到五季给刷了。总的来说，这是个关于牛仔、家族（类教父）、西部大开发（重心在关于开发与否的对抗上）的系列剧集，属于剧荒时很容易发现的高分美剧。也许是为了质感与叙述深度之类的，整体节奏偏慢，此前若干次想把它刷掉都没能成功。这次耐着性子看了下去，随着人物背后故事的揭开、当前时间线上的对抗升级，很快便体会到其高分魅力。然而第五季老达顿刚说完要教秘书玩关于威胁的游戏，下一集就直接被干掉了。由于尸体并没露脸，还以为会像前几季那样，一段振奋人心的音乐之后事情迎来反转，结果特么直接葬礼，直接送农场给原住民（前几季就是和原住民的对抗），直接剧终。有点无语，搜了下，原来是[凯文·科斯特纳和剧组闹掰了](https://news.qq.com/rain/a/20241115A09MHG00)。

扯远了。该视频网站收集来的视频资源，一集视频被嵌入了两段关于在线博彩的广告。看到第四季的时候，每段广告的长度达到了 25 秒，厚礼蟹！于是迅速肝了浏览器插件，通过先标记广告帧（同时标记持续时长），播放再遇到相似度很高的画面时直接跳过。

其中，相似度计算的实现大概像这样：

```js
function generateHash(grayPixels, avg) {
  let hash = 0n;
  grayPixels.forEach((val, i) => {
    if (val > avg) {
      hash |= 1n << BigInt(63 - i);
    }
  });
  return hash;
}

function hammingDistance(hash1, hash2) {
  const diff = hash1 ^ hash2;
  return diff.toString(2).replace(/0/g, '').length;
}

function calcSimilarity(image1, image2) {
  const distance = hammingDistance(
    generateHash(image1, image1.reduce((a, b) => a + b) / image1.length),
    generateHash(image2, image2.reduce((a, b) => a + b) / image2.length)
  )
  return 1 - (distance / 64);
}
```

是在我起了个 `calcSimilarity` 函数名称之后 `GitHub Copilot` 老哥给补全的，至于这几个函数干了什么以及为啥就能计算相似度，我数学不好（15 年江苏卷只考了 116），完全不知道🤯。

视频帧的截取，综合考量最后采用的 `canvas` 的 `drawImage`：

```js
function captureVideoFrame(frameSize) {
  const video = getVideoElement();
  if (!video) {
    console.error("No video element found to capture frame");
    return null;
  }
  const canvas = document.createElement('canvas');
  canvas.width = frameSize;
  canvas.height = frameSize;
  const context = canvas.getContext('2d');
  if (!context) {
    console.error("Failed to get canvas context");
    return null;
  }
  context.drawImage(video, video.videoWidth - frameSize, video.videoHeight - frameSize, frameSize, frameSize, 0, 0, frameSize, frameSize);
  const base64Image = canvas.toDataURL('image/png');
  return base64Image;
}
```

另外，对于广告帧的存储用到了 [IndexDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)，插件 Popup 等样式用了 [UnoCSS](https://unocss.dev/)。

该插件最终上架在国区友好的 [Edge 拓展商店](https://microsoftedge.microsoft.com/addons/detail/adskipper/nnobbaijadeebolilakhkmdkcmhmnnlh)，仓库在[这里](https://github.com/tkzt/adskipper)。
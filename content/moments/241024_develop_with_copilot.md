---
title: Dev with Copilot
date: 2024-10-24
---

手上有个任务是扫描仪控制、预览程序。为了增长 `rust` 功力，一听说目标平台是安卓，就立刻决定要基于 `rusb` 和 `Tauri` 来实现。大概一个月前，完成了一版之后就没再管了。

而到最近，采购的 Pad 到了，且有老板要看效果。在把程序装到 Pad 后，一番周折，最终令人蛋疼地得知，现代安卓（主要指 SDK >= 30）对于 USB 设备访问权限的管控更严格了，经过数小时的检索、尝试、失败，不得不放弃直接基于 `libusb` 和 USB 设备通信的方式。于是，任务进度重置为，`Android Studio` 新建项目完成。

好在有 **GitHub Copilot**，作为一个从来没有开发过 `Kotlin` 的**初级工程师**，最后耗时 2 天将该程序重新开发了一遍 🎉。

![](/usb_scan.png)

# 一起鲸动 · Remotion 工程

45 秒 / 1920×1080 / 30fps / 1350 帧。十二段图形动效短片，使用用户确认的分镜。

## 运行

需要 Node.js 20 或以上。

```bash
npm ci
npm run studio
npm run render
```

如机器已有 Chromium，可指定浏览器，例如 Linux：

```bash
npm run render -- --browser-executable=/usr/bin/chromium --concurrency=2
```

输出文件：`out/一起鲸动.mp4`。

渲染脚本先由 Remotion 输出全部画面，再使用其依赖中自带的 FFmpeg 对原配乐做最终封装，校准音轨起点、精确截到45秒并完成末尾0.7秒淡出；画面不重新编码。也可用环境变量 `FFMPEG_EXECUTABLE` 指定本机 FFmpeg。

## 工程内容

- `scripts/render.mjs`：可重复执行的成片渲染与音轨封装流程。
- `src/Root.tsx`：完整时间线、十一处衔接、音轨及尾部淡出。
- `src/ScenesOpening.tsx`：波纹开场、鲸鱼撞字、环形轨道、卡片空间。
- `src/ScenesMiddle.tsx`：声波、舞台、鲸群队列、圆阵。
- `src/ScenesFinale.tsx`：大字对撞、分屏合并、放射高潮、标题收束。
- `src/common.tsx`：保留原图轮廓的鲸鱼遮罩、文字与图形组件。
- `public/54545.png`：用户提供的原始鲸鱼图片，未经替换。
- `public/music.wav`：从用户指定的 `10月19日.mp4` 无损提取的完整音轨；成片使用 0–45 秒，44.3 秒起淡出。
- `public/whale-bold.otf`：Noto Sans CJK SC Bold 中文字体子集，许可见同目录 FONT-LICENSE.txt。

字体已随工程打包，动画由帧数驱动，无随机种子和外部图片依赖。新增汉字时可改用系统完整的 Noto Sans CJK SC 字体，或重新生成字体子集。

风格参照用户提供的 `0c4d0395ff8cad567fd057a58c08bec3.mp4`，参考文件本身不嵌入成片。

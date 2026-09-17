# 罗姗 · 作品集

纯静态 HTML / CSS / JavaScript 网站，保留黑板、手绘插画与作品互动。

## GitHub Pages

发布 `main` 分支根目录。资源使用相对路径，支持 GitHub Pages 项目网址。
无需构建，无需服务器密钥或后端服务。`.nojekyll` 保证静态文件直接发布。

## 资源与维护

- 图片使用 WebP，目录图标按显示尺寸优化；视频保持原文件和原分辨率。
- 正文字体保持原来的霞鹜文楷字形，使用 WOFF2 和 Unicode 分包按需加载；补充分包覆盖原字体的全部字符。
- 正式页面已移除临时文字与图片编辑器。内容通过源文件维护。
- 修改 CSS 或 JS 源码后运行 `node scripts/build.mjs`，再推送到 `main`，Pages 会更新。视频与插画仅用于本作品集展示。
- 第三方字体许可见 `assets/fonts/*-OFL.txt`；Lenis 许可见 `assets/vendor/lenis-LICENSE.txt`。

# AGENTS.md

本文件适用于整个仓库。后续代理或协作者在修改本项目时，应优先遵守这里的约定。

## 项目概览

这是一个个人主页静态站点，根目录包含可直接部署或浏览的产物文件，`source/` 目录包含主页的源码和 Gulp 构建配置，`game/` 与 `light/` 目录包含独立的静态页面或小游戏资源。

## 目录说明

- `index.html`、`apps.html`：根目录静态页面入口，其中 `index.html` 是由 `source/src/index.html` 构建生成的压缩版本。
- `assets/`：主页构建后的 CSS、JS、字体和图片资源。
- `source/src/`：主页源码目录，是修改主页内容、样式和脚本时的首选位置。
- `source/src/ts/`：心形粒子动画相关 TypeScript 源码。
- `source/src/js/`：第三方脚本和页面业务脚本。
- `source/src/css/`：会合并压缩为 `assets/css/app.min.css` 的样式源码。
- `source/src/style/`：主题色 CSS，会复制到 `assets/css/`。
- `source/gulpfile.js`：构建任务定义。
- `game/`：多个独立小游戏目录，通常包含已经打包好的运行文件和资源。
- `light/`：独立灯光页面及其资源。

## 环境与构建

构建命令需要在 `source/` 目录执行：

```sh
cd source
npm install
gulp
```

注意事项：

- 当前依赖使用 `gulp@3.9.1`，在较新的 Node.js 版本上可能因兼容性问题失败。若出现 Gulp 3 相关错误，优先切换到兼容旧版 Gulp 的 Node.js 版本后再构建。
- `source/package.json` 中的 `npm test` 是占位命令，会直接失败，不要把它当作有效测试。
- 如果修改 `source/src/ts/`，先使用 TypeScript 编译到 `source/bin/`，再运行 Gulp 合并压缩脚本。例如：

```sh
cd source
gulp
```

## 修改约定

- 修改主页内容、结构、样式或脚本时，优先改 `source/src/`，再通过 Gulp 生成根目录 `index.html` 和 `assets/` 下的产物。
- 如果只改根目录生成文件，请在变更说明中明确这是手工修改产物，避免后续构建覆盖。
- 不要提交 `source/node_modules/`、`source/bin/`、`source/package-lock.json` 等本地生成内容。
- 保持现有技术栈和写法：HTML 模板使用 Gulp template 的 `<%=assets%>` 占位符，主样式仍通过 Gulp 合并压缩。
- 这个仓库包含较多已压缩第三方库和游戏产物。除非任务明确要求，不要格式化、重写或无关改动这些压缩文件。
- 编辑中文页面内容时，保留现有中文语境和页面风格。

## 验证方式

最小验证：

```sh
cd source
gulp
```

构建后检查：

- 根目录 `index.html` 可以正常打开。
- `assets/js/app.min.js` 和 `assets/css/app.min.css` 已按预期更新。
- 页面资源路径仍以 `assets/`、`game/`、`light/` 等相对路径正常加载。

本项目是静态站点，也可以在仓库根目录启动本地服务做浏览器检查：

```sh
python3 -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 提交前检查

- 使用 `git status --short` 确认只包含本次任务相关文件。
- 如果运行过构建，检查生成的 `index.html`、`assets/js/app.min.js`、`assets/css/app.min.css` 是否确实是预期变化。
- 不要把本地依赖目录、缓存、IDE 配置或临时文件加入版本控制。

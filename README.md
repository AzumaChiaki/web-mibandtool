# MiBand Tool - 小米手环表盘工具

##  快速开始

### 本地运行 (Node.js)

如果你想自己运行代码：

1. **安装依赖**
   打开终端，进入项目目录：
   ```bash
   npm install
   ```

2. **启动 Web 服务**
   ```bash
   npm run web
   ```
   然后访问：http://localhost:3000

3. **启动桌面开发版**
   ```bash
   npm start
   ```

### 自行打包

如果你想自己编译生成安装包：

1. **安装依赖**
   ```bash
   npm install
   ```

2. **构建打包**
   
   **macOS:**
   npm run dist:mac
      **Windows:**sh
   npm run dist:win
      **Linux:**
   
   npm run dist:linux
      *注意：如果遇到签名卡住的问题，请在 `package.json` 的 `build.mac` 中设置 `"identity": null`。*

3. **获取安装包**
   打包完成后，在 `dist/` 文件夹中查找 `.dmg` 文件。

##  项目结构

```
.
├── public/          # 静态资源 (JS, CSS, JSON)
├── index.html       # 主页面
├── main.js          # Electron 主进程入口
├── server.js        # Web 服务器入口
└── dist/            # 打包输出目录
```


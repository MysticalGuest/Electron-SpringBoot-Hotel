'use strict'

import { app, protocol, BrowserWindow, Menu } from 'electron'
// import { app, protocol, BrowserWindow} from 'electron'
import {
  createProtocol
  // installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

// import server from '@/assets/server/server'
// import server from '@/assets/server/360Hotel-0.0.1-SNAPSHOT.jar'
import { startServer, stopServer } from '@/assets/server/server'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
const serverProcess = null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1100,
    height: 610,
    maximizable: false,
    resizable: false, // 窗口是否可以改变尺寸
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      webSecurity: false,
      nodeIntegration: true // 是否集成Node
    },
    // eslint-disable-next-line no-undef
    icon: `${__static}/app.ico`
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    // win.loadURL('app://./index.html')
    // 加载应用的界面文件
    win.loadURL(`file://${__dirname}/index.html`);
  }

  win.on('closed', () => {
    win = null
  })
  createMenu()
}

// 设置菜单栏
function createMenu() {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === 'darwin') {
    const template = [{
      label: 'App Demo',
      submenu: [
        {role: 'about'},
        {
          role: 'quit'
        }]
    }]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null)
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  stopServer(win, app, serverProcess); // 停止后台服务
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installVueDevtools()
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow();
  startServer(win, app, serverProcess); // 启动服务器
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 启动本项目中的服务器
// function startServer() {
//   // serverProcess.stdout.setEncoding('utf-8');
//   // serverProcess.stdin.setEncoding('utf8');
//   // serverProcess.stderr.setEncoding('utf8');
//   const cmdStr = 'java -jar 360Hotel-0.0.1-SNAPSHOT.jar' // 要运行的命令
//   // const cmdStr = 'node ' + server;
//   const serverPath = isDevelopment ? 'server' : '../server' // 注意开发环境和线上环境的路径不同；
//   // const serverPath = '@/assets/server';
//   runExec(cmdStr);
//   function runExec(cmdStr) {
//     // exec 函数 第一个参数是要执行的命令，第二个函数是配置选项，第三个参数是回调函数，配置项中常用到 子进程的工作目录
//     serverProcess = require('child_process').exec(cmdStr, {cwd: serverPath})
//     serverProcess.stdout.on('data', function(data) {
//       var reg = RegExp(/Success...Hotel Server/);
//       if (data.match(reg)) {
//         console.log('结束标志')
//         // store.commit('loadingState');
//         // store.dispatch('setloadingState');
//         // const { ipcMain } = require('electron')
//         // // 监听渲染进行发送的消息
//         // ipcMain.on('renderer-msg', (event, arg) => {
//         //   console.log('qwqwqwwq', arg) // prints "帮我创建一个新的页面",
//         //   // 执行创建页面的操作
//         //   event.reply('main-msg', ''); // 给渲染进程回复消息
//         // })
//         // 主进程向渲染进程发送消息,发信号表示后台服务加载完毕
//         win.webContents.send('loading', 'signal')
//       }
//       console.log('启动服务器成功 stdout:' + data)// 打印正常的后台可执行程序输出
//     })
//     serverProcess.stderr.on('data', function(data) {
//       console.log('stderr:' + data) // 打印错误的后台可执行程序输出
//     })
//     serverProcess.on('close', function (code) {
//       console.log('out code:' + code) // 退出之后的输出
//     })
//   }
// }
// // 关闭项目中的所有进程，主要是为了关闭刚刚启动的服务器进程。
// function stopServer() {
//   console.log('Kill server process.....');
//   const kill = require('tree-kill'); //  tree-kill是一个插件，需要安装，在项目中已经用 yarn add tree-kill 命令安装。
//   if (serverProcess) {
//     kill(serverProcess.pid, 'SIGTERM', function(err) { // 终止进程树，杀死所有进程，包括根进程。
//       console.log('Killed');
//       console.log(err);
//       serverProcess = null;
//       win = null;
//       app.quit();
//     })
//   }
// }

// app.stopServer = stopServer;

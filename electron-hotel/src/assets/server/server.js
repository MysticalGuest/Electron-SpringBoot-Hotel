// import server from './http'
let serverProcess = null
// 启动本项目中的服务器
export function startServer(win, app) {
  // serverProcess.stdout.setEncoding('utf-8');
  // serverProcess.stdin.setEncoding('utf8');
  // serverProcess.stderr.setEncoding('utf8');
  const cmdStr = 'java -jar 360Hotel-0.0.1-SNAPSHOT.jar' // 要运行的命令
  // const cmdStr = 'node ' + server;
  // const cmdStr = 'dir'
  // const serverPath = isDevelopment ? 'server' : '../server' // 注意开发环境和线上环境的路径不同；
  const serverPath = 'server';
  runExec(cmdStr);
  function runExec(cmdStr) {
    // exec 函数 第一个参数是要执行的命令，第二个函数是配置选项，第三个参数是回调函数，配置项中常用到 子进程的工作目录
    serverProcess = require('child_process').exec(cmdStr, {cwd: serverPath})
    serverProcess.stdout.on('data', function(data) {
      var reg = RegExp(/Success...Hotel Server/);
      if (data.match(reg)) {
        console.log('结束标志')
        // store.commit('loadingState');
        // store.dispatch('setloadingState');
        // const { ipcMain } = require('electron')
        // // 监听渲染进行发送的消息
        // ipcMain.on('renderer-msg', (event, arg) => {
        //   console.log('qwqwqwwq', arg) // prints "帮我创建一个新的页面",
        //   // 执行创建页面的操作
        //   event.reply('main-msg', ''); // 给渲染进程回复消息
        // })
        // 主进程向渲染进程发送消息,发信号表示后台服务加载完毕
        win.webContents.send('loading', 'signal')
      }
      console.log('启动服务器成功 stdout:' + data)// 打印正常的后台可执行程序输出
    })
    serverProcess.stderr.on('data', function(data) {
      console.log('stderr:' + data) // 打印错误的后台可执行程序输出
      app.quit()
    })
    serverProcess.on('close', function (code) {
      console.log('out code:' + code) // 退出之后的输出
    })
  }
}
// 关闭项目中的所有进程，主要是为了关闭刚刚启动的服务器进程。
export function stopServer(win, app) {
  console.log('Kill server process.....');
  const kill = require('tree-kill'); //  tree-kill是一个插件，需要安装，在项目中已经用 yarn add tree-kill 命令安装。
  if (serverProcess) {
    kill(serverProcess.pid, 'SIGTERM', function(err) { // 终止进程树，杀死所有进程，包括根进程。
      console.log('Killed');
      console.log(err);
      serverProcess = null;
      win = null;
      app.quit();
    })
  }
}

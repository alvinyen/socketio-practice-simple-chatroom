# socketio-practice-simple-chatroom

## 以[WebSockets Tutorial (Node & Socket.io Chat App)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9i4V-_ZVwLmOusj8YAUhj_9)為參考完成實作。

## 『 0. 專案說明 』
- 練習socketio的基本使用
- 記錄實作過程的相關重點

<hr>
<hr>

## 『 1. environment / webpack setting 』
- 詳細webpack設定可參考[youtube-presentation-redux-socketio-practice](https://github.com/alvinyen/youtube-presentation-redux-socketio-practice)
- 沒有設定filename的話預設會bundle出main.js而不是bundle.js...
    - ![](https://i.imgur.com/WPjHQhl.png)

<hr>
<hr>

## 『 regular event and broadcasting event 』
- on server side
    - io.socket"s".emit
    - socket.broadcast.emit

<hr>
<hr>

## 『 4. io.socket"s".emit 』
- 送chat message到各個socket.io-client

<hr>
<hr>

## 『 5. using socket.broadcast.emit broadcasting message 』
- 在各個socket.io-client呈現"xxx用戶正在輸入訊息"
- 掛一個keyPress的event到message div
- client side：this.socket.emit('typing')
- server side：socket.broadcast.emit
- !!important：送出訊息之後記得清掉feedback中的內容 => 在接到訊息的地方去做清掉的動作
- ![](https://i.imgur.com/O02CtXh.png)
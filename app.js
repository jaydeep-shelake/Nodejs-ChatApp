const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 3000;


const public = path.join(__dirname,'./public');
app.use(express.static(public));

app.get('/',(req,res)=>{
 res.render('index');
});

app.post('/',(req,res)=>{

});

http.listen(port,()=>{
 console.log(`your server is running at http://localhost:${port}`);
});

io.on('connection',(socket)=>{
console.log('Connected..');
socket.on('message',(msg)=>{
 socket.broadcast.emit('message',msg);  // send to every one joinde the chat
});
});
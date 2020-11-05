const socket =io();
let userName=prompt('Please Enter your name');

const userInput = document.getElementById('input');
const sendMsgBtn = document.getElementById('btn-submit');
const msgArea = document.querySelector('.msg-area');
const notification=document.getElementById('nofication');

sendMsgBtn.addEventListener('click',sendMsg);

function sendMsg(){
    let msg={
        user:userName,
        msg:userInput.value.trim(),
    }
    appendMsg(msg,'right');
    scrollTopScreen();
    userInput.value='';

    //send to server
    socket.emit('message',msg)
}

function appendMsg(msg,position){
 const div = document.createElement('div');
 div.classList.add(position,'msg');
 if(position=='right'){
    div.innerHTML=`<h4>You</h4>
    <p>${msg.msg}</p> `;
 }
 else{
    div.innerHTML=`<h4>${msg.user}</h4>
    <p>${msg.msg}</p> `;
 }
 
msgArea.appendChild(div);
}

//recive the mesage

socket.on('message',(msg)=>{
    appendMsg(msg,'left');
    scrollTopScreen();
    
    
    console.log(msg);
});

function scrollTopScreen(){
    msgArea.scrollTop=msgArea.scrollHeight;
}
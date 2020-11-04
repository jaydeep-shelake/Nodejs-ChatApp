const socket =io();
let userName=prompt('Please Enter your name');

const userInput = document.getElementById('input');
const sendMsgBtn = document.getElementById('btn-submit');
const msgArea = document.querySelector('.msg-area');

sendMsgBtn.addEventListener('click',sendMsg);
console.log(userName);

userInput.addEventListener('keyup',(e)=>{
 console.log(`${userName}user is typing`);
});
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
 div.innerHTML=`<h4>${msg.user}</h4>
                <p>${msg.msg}</p> `;
msgArea.appendChild(div);
}

//recive the mesage

socket.on('message',(msg)=>{
    appendMsg(msg,'left');
    scrollTopScreen();
});

function scrollTopScreen(){
    msgArea.scrollTop=msgArea.scrollHeight;
}
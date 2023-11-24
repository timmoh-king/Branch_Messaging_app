import React, { useEffect, useState } from 'react'
import './App.css';

const ChatSpace = ({ socket, agentId, chatId }) => {
  const [currentmessage, setCurrentMessage] = useState('');

  const sendMessage = async() => {
    if (currentmessage !== '') {
      const currentDate = new Date();
      const messageData = {
        chatId: chatId,
        agentId: agentId,
        message: currentmessage,
        time: `${currentDate.getFullYear()}:${currentDate.getHours()}:${currentDate.getMinutes()}`
      };
      await socket.emit("send_message", messageData)
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    })
  }, [socket]);

  return (
    <div>
      <div className='chat-header'>
        <h3>Live Chat</h3>
      </div>
      <div className='chat-body'>

      </div>
      <div className='chat-footer'>
        <input type='text' placeholder='write a message...' onChange={(e) => {setCurrentMessage(e.target.value)}} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default ChatSpace;
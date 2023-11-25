import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './App.css';

const ChatSpace = ({ socket, agentId, chatId }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatList, setChatList] = useState([]);

  const sendMessage = async() => {
    if (currentMessage !== "") {
      const currentDate = new Date();
      const messageData = {
        chatId: chatId,
        agentId: agentId,
        message: currentMessage,
        time: `${currentDate.getHours()}:${currentDate.getMinutes()}`
      };
      await socket.emit("send_message", messageData);
      setChatList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const messageHandler = (data) => {
      setChatList((list) => [...list, data]);
    };
  
    socket.on("receive_message", messageHandler);
  
    return () => {
      socket.off("receive_message", messageHandler);
    };
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {chatList.map((listData, key) => {
            return (
            <div className='message' key={key} 
              id={agentId === listData.agentId ? "other" : "you"}>
              <div>
                <div className='message-content'>
                  <p>{listData.message}</p>
                </div>
                <div className='message-meta'>
                  <p id="time">{listData.time}</p>
                  <p id="agent">{listData.agentId}</p>
                </div>
              </div>
            </div>);
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input 
          type='text' 
          placeholder='write a message...'
          value={currentMessage}
          onChange={(e) => {setCurrentMessage(e.target.value)}}
          onKeyPress={(e) => {e.key === "Enter" && sendMessage()}} 
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default ChatSpace;
import React from 'react'

const ChatSpace = ({ socket, agentId, chatId }) => {
  return (
    <div>
      <div className='chat-header'>
        <h3>Live Chat</h3>
      </div>
      <div className='chat-body'>

      </div>
      <div className='chat-footer'>
        <input type='text' placeholder='write a message...' />
        <button>&#9658;</button>
      </div>
    </div>
  )
}

export default ChatSpace;
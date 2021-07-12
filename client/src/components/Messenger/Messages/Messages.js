import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name }) => (
  <div className="conversation">
    <img className="conversationImg" src="http://placekitten.com/200/300" alt="" />
    <span className="conversationName">John Doe</span>
    {/* <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom> */}
  </div>
);

export default Messages;

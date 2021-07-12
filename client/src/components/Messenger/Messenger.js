import { Button } from "@material-ui/core";
import React from "react";
import queryString from "query-string";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";



import Conversation from "./Conversation/Conversation";
import "./Messenger.css";
import Message from "./Messages/Message/Message"
import ChatOnline from './ChatOnline/ChatOnline';

import axios from "axios";
const ENDPOINT = "http://localhost:5000/";

let socket;

const Messenger = (props) => {

  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState("")
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef();
  const socket = useRef()
  const { chat } = useParams();
  const user = props.userID
  useEffect(() => {
    // if (props.location.state) {
    //   setCurrentChat(props.location.state.currentChat)

    // }
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, []);

  console.log(currentChat);

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", props.userID);
    socket.current.on("getUsers", users => {
      setOnlineUsers(users)
    })
  }, [user])

  useEffect(() => {
    socket.current?.on("welcome", message => {
    })
  }, [socket]);

  useEffect(() => {

    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/conversation/" + props.userID)
        setConversations(res.data)
        console.log(conversations)

      } catch (err) {
        console.log(err)
      }
    };

    getConversations();


  }, [user])

  useEffect(() => {
    if (props.location.state !== undefined) {
      setCurrentChat(props.location.state.currentChat)
    }
  }, [])

  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get("http://localhost:5000/message/" + currentChat?._id);
      try {
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: props.userID,
      text: newMessage,
      conversationId: currentChat._id,
      createdAt: Date.now()
    }

    console.log(message);

    const receiverId = currentChat.members.find(member => member !== props.userID)
    socket.current.emit("sendMessage", {
      senderId: props.userID,
      receiverId: receiverId,
      text: newMessage,
      createdAt: Date.now()
    });

    try {
      const res = await axios.post("http://localhost:5000/message", message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  }



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])



  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="chatMenuHeader">
              <h1 className="chatMenuHeadding">Chats</h1>
            </div>
            <input className="chatMenuInput" placeholder="Suche nach Chats"></input>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={props.userID} onlineUsers={onlineUsers} currentChat={currentChat} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ?
              <>

                <div className="chatBoxTop mostly-customized-scrollbar">
                  <div className="chatTitle">
                    <h1 className="chatMenuHeadding">Chat mit {currentChat?.members.find(member => member !== props.userID)}</h1>
                  </div>
                  {messages.map(m => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === props.userID} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input className="chatMessageInput" placeholder="Schreibe eine Nachricht..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>Senden</button>
                </div></> : <span className="noConversationChat">Öffne eine Konversation um einen Chat zu starten</span>}
          </div>

        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={userID} setCurrentChat={setCurrentChat} />

          </div>
        </div> */}
      </div>
    </>
  );
};

export default Messenger;

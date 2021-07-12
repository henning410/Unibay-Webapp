import React from 'react';
import './ChatOnline.css'
import { useEffect, useState, useRef } from "react";
const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    // useEffect(() => {
    //     const getFriends = async () => {
    //         const res = await axios.get("http://localhost/users/friends" + currentId)
    //     }
    // }, [])
    return (
        <div className="chatOnline">
            <div classname="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                    <div className="chatOnlineBadge">

                    </div>
                    <div className="chatOnlineUsername">John</div>
                </div>
            </div>
        </div>
    )
}

export default ChatOnline;
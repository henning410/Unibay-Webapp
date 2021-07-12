import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import "./Conversation.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const Conversation = ({ conversation, currentUser, onlineUsers, currentChat }) => {

    const [friendUsername, setFriendUsername] = useState(null);
    const [offerPicture, setOfferPicture] = useState(null);
    const [friendOnline, setFriendOnline] = useState(false);
    const [offercard, setOffercard] = useState('')
    const imagePath = "http://localhost:5000/uploads/"
    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser);
        const getFriendUserData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/user?nameId=" + friendId)
                console.log(res.data[0].username)
                setFriendUsername(res.data[0].username);

            } catch (err) {
                console.log(err)
            }
        }

        getFriendUserData();
    }, []);

    useEffect(() => {
        const getOffercardTitle = async () => {

            try {
                const res = await axios.get("http://localhost:5000/offercard/get/" + conversation.offercardId)
                setOffercard(res.data[0]);
                setOfferPicture(res.data[0].photo);
            } catch (err) {
                console.log(err)
            }
        }

        getOffercardTitle();

    }, [])


    useEffect(() => {

        const isFriendOnline = () => {
            console.log(friendUsername)
            if (onlineUsers.find(friend => friend.userId === friendUsername)) {
                setFriendOnline(true);
            }
            else {
                setFriendOnline(false);
            }
        }

        isFriendOnline();
    }, [friendUsername])


    if (currentChat?._id === conversation._id) {
        return (
            <div className="conversation current">
                <img className="conversationImg" src={imagePath + offerPicture} />
                <span className="conversationName">{offercard.title} ({friendUsername})</span>
                {friendOnline && <div className="chatOnlineBadge"></div>}
            </div >
        )
    }
    else {
        return (
            <div className="conversation">
                <img className="conversationImg" src={imagePath + offerPicture} />
                <span className="conversationName">{offercard.title} ({friendUsername})</span>
                {friendOnline && <div className="chatOnlineBadge"></div>}
            </div >
        )
    }

};

export default Conversation;
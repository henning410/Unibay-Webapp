import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import GridList from "@material-ui/core/GridList";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  //Styling für die ganze Karte
  card: {
    width: "45vh",
    backgroundColor: "#D7DFF2",
    height: "60vh",
  },
  //Styling für Icon+ Ich Suche/Ich Biete
  header: {
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
  },
  //Styling für Überschrift
  heading: {
    color: "#0051a8",
    textTransform: "none",
  },
  //Styling für gesamten Header
  headerbox: {
    height: "12vh",
  },
  //Styling für Image
  img: {
    height: 250,
    width: 400,
  },
  //Styling für Buttons
  button: {
    background: "#0051a8",
    color: "white",
    border: "1px solid #0051a8",
    "&:hover": {
      background: "white",
      color: "#0051a8",
      border: "1px solid #0051a8",
    },
  },
  description: {
    textTransform: "none",
  },
  centerImage: {
    display: "flex",
    justifyContent: "center",
  },
  CardContent: {
    float: "left",
    marginBottom: "5%",
    marginTop: "5%",
    marginRight: "5%",
    marginLeft: "5%",
    width: "90%",
    position: "relative",
  },
  buttonsFooter: {
    display: "flex",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: -30,
    width: "36vh",
  },
}));

export default function BigOffercard(props) {
  const history = useHistory();
  const classes = useStyles();
  const imagePath = "http://localhost:5000/uploads/";
  const [conversation, setConversation] = useState(null);
  const [requestMade, setRequestMade] = useState(false);
  //Onclick Methode für Merkliste-Button
  const pressWatchlist = (currentuserID, OffercardID) => {
    axios
      .put(`http://localhost:5000/user/addToWatchlist/${currentuserID}/${OffercardID}`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log("Error while Axios");
      });
  };

  const createConversation = async () => {
    if (conversation === null) {
      const newConversation = {
        senderId: props.currentUsername,
        receiverId: props.userID,
        offercardId: props.id,
      };
      try {
        const res = await axios.post("http://localhost:5000/conversation/", newConversation);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/conversation/byoid/" + props.id);
        console.log(res.data);
        if (res.data.length !== 0 && res.data[0].members.find((member) => member == props.currentUsername)) {
          setRequestMade(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
    console.log(conversation);
  }, [requestMade]);

  console.log(conversation);

  return (
    <Card className={classes.card}>
      <div className={classes.CardContent}>
        <div className={classes.headerbox}>
          <div className={classes.header}>
            <Typography component="h5" variant="h5">
              {props.offercard.type}
            </Typography>
            {/* <Typography variant="h8">{props.userID}</Typography> */}
            <Avatar>{props.offercard.username}</Avatar>
          </div>
          <Typography variant="h5" className={classes.heading}>
            {props.offercard.title}
          </Typography>
        </div>
        <CardMedia className={classes.img} image={imagePath + props.offercard.photo} />
        <Typography Typography variant="h7" className={classes.heading} align="left">
          {props.offercard.longitude} {props.offercard.latitude}
        </Typography>
        <CardContent>
          <GridList cellHeight={100} cols={1}>
            <Typography variant="body2" align="left" className={classes.description}>
              {props.offercard.description}
            </Typography>
          </GridList>
        </CardContent>
        <div className={classes.buttonsFooter}>
          <div>
            <Button size="small" className={classes.button} onClick={() => pressWatchlist(props.currentUsername, props.id)}>
              Zur Merkliste
            </Button>
          </div>
          <div>
            {!requestMade && props.currentUsername !== props.userID && (
              <Link onClick={createConversation} to={`/messenger`}>
                Anfragen
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

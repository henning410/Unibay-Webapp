import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Col, Row, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  //Styling für die ganze Karte
  card: {
    [theme.breakpoints.up("xl")]: {
      width: 280,
      height: 380,
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: 260,
      height: 350,
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 240,
      height: 330,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: 200,
      height: 330,
    },
    backgroundColor: "#D7DFF2",
  },
  //Styling für Icon+ Ich Suche/Ich Biete
  header: {
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
    textAlign: "left",
  },
  //Styling für Überschrift
  heading: {
    color: "#0051a8",
    textTransform: "none",
  },
  //Styling für gesamten Header
  headerbox: {
    fontSize: "1rem",
    position: "relative",
  },
  //Styling für Image
  img: {
    [theme.breakpoints.up("xl")]: {
      height: 210,
      width: "100%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      height: 180,
      width: 180,
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: 160,
      width: 160,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      height: 160,
      width: 160,
    },
  },
  centerImage: {
    display: "flex",
    justifyContent: "center",
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
  CardContent: {
    float: "left",
    marginBottom: "5%",
    marginTop: "5%",
    marginRight: "5%",
    marginLeft: "5%",
    width: "90%",
  },
  buttonsFooter: {
    display: "flex",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 20,
    [theme.breakpoints.up("xl")]: {
      width: 280,
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: 260,
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 240,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: 200,
    },
  },
}));

//responsives Anzeigen der offercard
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function Watchlistcard(props) {
  const classes = useStyles();
  const uploadPath = "http://localhost:5000/uploads/";
  const [location, setLocation] = useState("");
  const [requested, setRequested] = useState("");
  const [conversation, setConversation] = useState("");
  const history = useHistory();

  //Onclick Methode für Merkliste-Button
  const pressWatchlistDelete = (currentuserID, OffercardID) => {
    console.log("TEST" + OffercardID + currentuserID);
    axios
      .put(`http://localhost:5000/user/deleteFromWatchlist/${currentuserID}/${OffercardID}`)
      .then((res) => {
        console.log(res.data);
        props.updateWatchlist(OffercardID);
      })
      .catch((error) => {
        console.log("Error while Axios");
      });
  };

  useEffect(() => {
    if (props.userConversations?.find((conversation) => conversation.offercardId === props.offercard._id)) {
      const conversation = props.userConversations.find((conversation) => conversation.offercardId === props.offercard._id);
      console.log(conversation);
      setRequested(true);
      setConversation(conversation);
    }
  }, []);

  const createChat = async () => {
    await axios
      .post(`http://localhost:5000/conversation/`, {
        senderId: props.userID,
        receiverId: props.offercard.username,
        offercardId: props.offercard._id,
      })
      .then((res) => history.push("/messenger", { currentChat: res.data }));
  };

  useEffect(() => {
    if (props.offercard.latitude && props.offercard.longitude)
      Geocode.fromLatLng(props.offercard.latitude, props.offercard.longitude).then((response) => {
        let city;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                break;
              case "country":
                break;
              default:
                break;
            }
          }
        }

        setLocation(city);
      });
  }, []);

  return (
    <>
      <style type="text/css">
        {`
       .username {
         margin-left: 5px;
       }

       .card-img-top {
        width: 100%;
        height: 15vw;
        object-fit: cover;
        }
  `}
      </style>

      <Col>
        <Card>
          {props.offercard.photo && <Card.Img variant="top" src={uploadPath + props.offercard.photo} />}
          <Card.Body>
            <Card.Title>{props.offercard.title}</Card.Title>
            <Card.Text>{props.offercard.description}</Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row className="justify-content-between">
                <Col md="auto">{props.offercard.type == "Suche" ? <i className="fas fa-search"></i> : <i class="fas fa-shopping-cart"></i>}</Col>
                <Col md="auto">
                  <span className="username">{props.offercard.price}</span>
                  <i class="fas fa-euro-sign"></i>
                </Col>
              </Row>
              <Row className="justify-content-between">
                <Col md="auto">
                  <i class="fas fa-user"></i>
                  <span className="username">{props.offercard.username}</span>
                </Col>
                <Col md="auto">
                  <span className="username">{location !== "" && location} </span>
                  <i className="fas fa-map-marker-alt "></i>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <Card.Footer>
            <Row className="justify-content-between">
              <Col md="auto">
                {!requested ? (
                  <Button variant="primary" onClick={createChat} size="sm">
                    Anfrage
                  </Button>
                ) : (
                  <Link to={{ pathname: "/messenger", state: { currentChat: conversation } }}>
                    {" "}
                    <Button variant="primary" size="sm">
                      Zum Chat
                    </Button>{" "}
                  </Link>
                )}

                {""}
              </Col>
              <Col md="auto">
                <Button onClick={() => pressWatchlistDelete(props.userID, props.offercard._id)} variant="danger" size="sm">
                  Entfernen
                </Button>
                {""}
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
}

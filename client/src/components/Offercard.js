import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Col, Row, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import axios from "axios";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("INSERT GOOGLE API KEY HERE");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("de");

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
export default function Offercard(props) {
  const classes = useStyles();
  const uploadPath = "http://localhost:5000/uploads/";
  const [location, setLocation] = useState("");
  const [requested, setRequested] = useState(false);
  const [conversation, setConversation] = useState("");
  const history = useHistory();
  const [showWatchlistAlert, setShowWatchlistAlert] = useState(false);
  useEffect(() => {
    if (props.offercard.latitude && props.offercard.longitude)
      //comment this in to use Google API Geolocation
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

    //comment this out to disable hard coded location and use instead google API
    // setLocation("Esslingen am Neckar");
  }, []);

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
      .then((res) => {
        history.push("/messenger", { currentChat: res.data });
      });

    setRequested(true);
  };

  useEffect(() => {
    const getWatchlists = async () => {
      await axios.get("http://localhost:5000/user/getWatchlist/" + props.userID).then((res) => {
        if (res.data[0]?.watchlist.find((id) => id == props.offercard._id)) {
          setShowWatchlistAlert(true);
        }
      });
    };

    getWatchlists();
  }, []);

  const pressWatchlist = async (currentuserID, OffercardID) => {
    await axios
      .put(`http://localhost:5000/user/addToWatchlist/${currentuserID}/${OffercardID}`)
      .then((res) => {
        console.log(res.data);
        setShowWatchlistAlert(true);
      })
      .catch((error) => {
        console.log("Error while Axios");
      });
  };

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
                {props.offercard.price && (
                  <Col md="auto">
                    <span className="username">{props.offercard.price}</span>
                    <i class="fas fa-euro-sign"></i>
                  </Col>
                )}
              </Row>
              <Row className="justify-content-between">
                <Col md="auto">
                  <i class="fas fa-user"></i>
                  <span className="username">{props.offercard.username}</span>
                </Col>
                {location !== "" && (
                  <Col md="auto">
                    <span className="username">{location !== "" && location} </span>
                    <i className="fas fa-map-marker-alt "></i>
                  </Col>
                )}
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <Card.Footer>
            <Row className="justify-content-between">
              <Col md="auto">
                {!requested ? (
                  <Button variant="primary" disabled={props.disabledButtons} onClick={createChat} size="sm">
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
                <Button
                  variant="primary"
                  disabled={showWatchlistAlert || props.disabledButtons}
                  onClick={() => pressWatchlist(props.userID, props.offercard._id)}
                  size="sm"
                  className="float-end"
                >
                  {showWatchlistAlert ? <i class="fas fa-check-circle"></i> && <span>In der Merkliste</span> : <span>Zur Merkliste</span>}
                </Button>
                {""}
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </>
    // <ThemeProvider theme={theme}>
    //   <Card className={classes.card}>
    //     <div className={classes.CardContent}>
    //       <div className={classes.headerbox}>
    //         <div className={classes.header}>
    //           <Typography component="h5" variant="h5">
    //             {props.type}
    //           </Typography>
    //           {/* <Typography variant="h8">{props.userID}</Typography> */}
    //           <Avatar>{props.userID}</Avatar>
    //         </div>
    //         <Typography variant="h5" className={classes.heading} align="left">
    //           {props.title}
    //         </Typography>
    //       </div>
    //       <div className={classes.centerImage}>
    //         <CardMedia image={props.photo} className={classes.img} />
    //       </div>
    //     </div>
    //     {/* <div className={classes.buttonsFooter}>
    //       <div>
    //         <Button
    //           size="small"
    //           className={classes.button}
    //           onClick={() => pressWatchlist(props.currentUsername, props.id)}
    //         >
    //           Zur Merkliste
    //         </Button>
    //       </div>
    //       <div>
    //         <Button size="small" color="primary" className={classes.button}>
    //           Anfragen
    //         </Button>
    //       </div>
    //     </div> */}
    //   </Card>
    // </ThemeProvider>
  );
}

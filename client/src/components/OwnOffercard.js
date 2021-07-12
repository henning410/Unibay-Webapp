import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Col, Row, ListGroup, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";

const useStyles = makeStyles((theme) => ({
  //Styling für die ganze Karte
  card: {
    width: "15vw",
    backgroundColor: "#D7DFF2",
    height: "40vh",
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
  },
  //Styling für gesamten Header
  headerbox: {
    height: "12vh",
  },
  //Styling für Image
  img: {
    height: "10vw",
    width: "10vw",
    marginLeft: "1vw",
    marginRight: "1vw",
  },

  center: {
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
    justifyContent: "space-between",
    width: "100%",
  },
}));

export default function OwnOffercard(props) {
  const classes = useStyles();
  const uploadPath = "http://localhost:5000/uploads/";
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    console.log("CLick");
    setShowModal(true);
  };
  const handleSave = (id) => {
    deleteOwnOffercard(props.offercard._id);
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const deleteOwnOffercard = (id) => {
    axios.delete(`http://localhost:5000/offercard/delete/${id}`).then(() => {
      window.location.reload(false);
    });
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

    //comment this out to disable hard coded location and use instead google API
    // setLocation("Esslingen am Neckar");
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
                <Button variant="danger" onClick={handleShow} size="sm">
                  Löschen
                </Button>
                {""}
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>Möchtest du die Anzeige wirklich löschen?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zurück
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Löschen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

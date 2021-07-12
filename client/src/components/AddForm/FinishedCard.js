import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Offercard from "./../Offercard";
import "./../../css/AddForm.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class FinishedCard extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() { }

  continue = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.props.nextStep();
  };

  onSubmit() {
    const { values } = this.props;

    const formData = new FormData();
    formData.append("type", values.type);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("username", this.props.userID);
    formData.append("category", values.category);
    formData.append("photo", values.photo);
    formData.append("longitude", values.longitude);
    formData.append("latitude", values.latitude);
    formData.append("price", values.price);

    axios
      .post("http://localhost:5000/offercard/add", formData)
      .then((res) => {
        console.log(res);
        this.continue();
      })
      .catch((error) => {
        console.log("Error while Axios " + error);
      });
  }

  render() {
    const { values, inputChange, pictureChange, nextStep, userID } = this.props;

    var finishedCard = {
      type: values.type,
      title: values.title,
      description: values.description,
      category: values.category,
      longitude: values.longitude,
      latitude: values.latitude,
      username: userID,
      price: values.price,
    };

    if (values.photo) {
      finishedCard.photo = 'iPhone.jpg';
    }

    if (values.price) {
      finishedCard.price = values.price;
    }
    return (
      <Container className="typeContainer" fluid>
        <Row className="form-container">
          <Typography align="center" variant="h5" className="TypoColor typeHeadline">
            Möchtest du die Anzeige so erstellen?
          </Typography>
        </Row>
        <Row className="marginRow">
          <Offercard offercard={finishedCard} disabledButtons={true} userID={userID} />
        </Row>

        <Row className="marginRow">
          <Link to={{ pathname: "/profile" }}>
            <Button variant="success" value={false} onClick={this.onSubmit}>
              Erstellen!
            </Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

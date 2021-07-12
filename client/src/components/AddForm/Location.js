import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./../../css/AddForm.css";
export default class Type extends Component {
  continue = (e) => {
    e.preventDefault();
    // this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  getLocation = (e) => {
    e.preventDefault();

    this.props.geoLocation();
  };

  render() {
    const { values, boolChange, nextStep, geoLocation, setLocationBack } = this.props;
    return (
      <Container className="typeContainer" fluid>
        <Row className="form-container">
          <Typography align="center" variant="h5" className="TypoColor typeHeadline">
            Fast geschafft! Möchtest du deinen Standort hinzufügen?
          </Typography>
        </Row>
        <Row className="marginRow">
          <Button variant="true" className="btn btn-primary" onClick={this.getLocation}>
            Ja
          </Button>
        </Row>

        <Row className="marginRow">
          <Button variant="false" className="btn btn-primary" onClick={boolChange("location")}>
            Nein
          </Button>
        </Row>
        <Row className="marginRow">
          <Button variant="danger" onClick={this.back}>
            Zurück
          </Button>
        </Row>
      </Container>
    );
  }
}

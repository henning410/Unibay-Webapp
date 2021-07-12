import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./../../css/AddForm.css";
export default class Type extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, inputChange, boolChange } = this.props;
    return (
      <Container className="typeContainer" fluid>
        <Row className="form-container">
          <Typography align="center" variant="h5" className="TypoColor typeHeadline">
            Möchtest du einen Preis angeben?
          </Typography>
        </Row>
        <Row className="marginRow">
          <Button value="true" onClick={boolChange("priceBool")}>
            Ja
          </Button>
        </Row>

        <Row className="marginRow">
          <Button value="false" onClick={boolChange("priceBool")}>
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

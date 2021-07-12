import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
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
    const { values, priceChange, nextStep } = this.props;

    return (
      <Container className="typeContainer" fluid>
        <Row className="form-container">
          <Typography align="center" variant="h5" className="TypoColor typeHeadline">
            Wie viel soll der Artikel kosten? (in €)
          </Typography>
        </Row>
        <Row className="marginRow">
          <Form.Control
            onChange={priceChange("price")}
            type="text"
            placeholder="Preis"
            pattern="[A-Za-z]{3}"
            isValid={values.price !== ""}
            isInvalid={values.price === ""}
          ></Form.Control>
        </Row>
        <Row className="marginRow">
          <Button variant="success" value={false} disabled={values.price === ""} onClick={this.continue}>
            Weiter
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

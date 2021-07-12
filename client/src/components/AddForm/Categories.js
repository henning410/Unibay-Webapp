import React, { useState, useEffect, Component } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Typography } from "@material-ui/core";
export default class Categories extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, inputChange, boolChange, nextStep } = this.props;
    return (
      <Container className="typeContainer" fluid>
        <Row className="form-container">
          <Typography align="center" variant="h5" className="TypoColor typeHeadline">
            {" "}
            Wähle eine Kategorie für deine Kleinanzeige
          </Typography>
        </Row>
        <Row className="marginRow">
          <Form.Group as={Col} controlId="formGridState">
            {/* <Form.Label>Kategorie</Form.Label> */}
            <Form.Control onChange={inputChange("category")} as="select" defaultValue="">
              <option value="">Auswählen...</option>
              <option value="">Ohne Kategorie weiter</option>
              <option>Dienstleistungen</option>
              <option>Immobilien</option>
              <option>Freizeit</option>
              <option>Sport</option>
              <option>Tiere</option>
              <option>Garten</option>
              <option>Medien</option>
              <option>Unterricht und Kurse</option>
              <option>Lernmaterialien</option>
              <option>Elektronik</option>
              <option>Zu verschenken</option>
              <option>Kleidung</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="marginRow"></Row>

        <Row className="marginRow">
          <Button variant="success" disabled={values.title === "" || values.description === ""} onClick={this.continue}>
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

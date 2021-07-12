import React, { Component } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { Typography } from "@material-ui/core";
export default class TitleDescription extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, inputChange, typeChange } = this.props;
    return (
      <Container className="typeContainer" fluid>
        <Row className="form-container">
          {values.type === "Biete" ? (
            <Typography align="center" variant="h5" className="TypoColor typeHeadline">
              {" "}
              Was möchtest du anbieten?
            </Typography>
          ) : (
            <Typography align="center" variant="h5" className="TypoColor typeHeadline">
              {" "}
              Was suchst du?
            </Typography>
          )}
        </Row>
        <Row className="marginRow">
          <Form.Control onChange={inputChange("title")} type="text" placeholder="Titel" isInvalid={values.title === ""} isValid={values.title !== ""}></Form.Control>
        </Row>

        <Row className="marginRow">
          <Form.Control
            onChange={inputChange("description")}
            placeholder="Beschreibung"
            as="textarea"
            rows={3}
            isInvalid={values.description === ""}
            isValid={values.description !== ""}
          />
        </Row>

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

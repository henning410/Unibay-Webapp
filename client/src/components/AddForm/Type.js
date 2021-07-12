import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./../../css/AddForm.css";
export default class Type extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const { values, inputChange, boolChange } = this.props;
    return (
      <Container className="typeContainer" fluid>
        <Row className="form-container">
          <Typography align="center" variant="h5" className="TypoColor typeHeadline">
            Möchtest du etwas anbieten oder suchst du etwas?
          </Typography>
        </Row>
        <Row className="marginRow">
          <Button value="Suche" onClick={boolChange("type")}>
            Suche
          </Button>
        </Row>

        <Row className="marginRow">
          <Button value="Biete" onClick={boolChange("type")}>
            Biete
          </Button>
        </Row>
      </Container>
    );
  }
}

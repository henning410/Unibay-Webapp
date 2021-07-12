import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { DropzoneArea } from "material-ui-dropzone";
import "./../../css/AddForm.css";
export default class Type extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.setLocationBack();
    this.props.prevStep();
  };

  render() {
    const { values, inputChange, pictureChange, nextStep, setLocationBack } = this.props;
    return (
      <Container className="typeContainer" fluid>
        <Row className="form-container">
          <Typography align="center" variant="h5" className="TypoColor typeHeadline">
            Möchtest du ein Bild hinzufügen?
          </Typography>
        </Row>
        <Row className="marginRow">
          <DropzoneArea dropzoneText="Hier Bild ablegen!" filesLimit={1} maxFileSize={5000000} showPreviews showPreviewsInDropzone={false} onChange={pictureChange} />
        </Row>
        {values.photo == null ? (
          <Row className="marginRow">
            <Button variant="success" value={false} onClick={this.continue}>
              Weiter ohne Bild
            </Button>
          </Row>
        ) : (
          <Row className="marginRow">
            <Button variant="success" value={false} onClick={this.continue}>
              Weiter
            </Button>
          </Row>
        )}
        <Row className="marginRow">
          <Button variant="danger" onClick={this.back}>
            Zurück
          </Button>
        </Row>
      </Container>
    );
  }
}

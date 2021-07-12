import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { DropzoneArea } from 'material-ui-dropzone'
import './../../css/AddForm.css'
export default class SubmitOffer extends Component {

    continue = e => {
        e.preventDefault();
        // this.props.nextStep();
    }

    render() {
        const { values } = this.props;
        return (
            <Container className="typeContainer" fluid>
                <Row className="form-container">
                    <Typography align="center" variant="h5" className="TypoColor typeHeadline">Sicher, dass du die Anzeige erstellen möchtest?</Typography>
                </Row >
                <Row className="marginRow">
                    <Button variant="success" onClick={this.continue}>Ja</Button>
                </Row>

                <Row className="marginRow">
                    <Button variant="success" onClick={this.continue}>Nein</Button>
                </Row>

            </Container >

        )
    }
}
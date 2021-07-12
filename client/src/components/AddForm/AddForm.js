import React, { Component } from "react";
import Type from "./Type";
import TitleDescription from "./TitleDescription";
import PriceBool from "./PriceBool";
import Price from "./Price";
import Location from "./Location";
import Picture from "./Picture";
import FinishedCard from "./FinishedCard";
import "./../../css/AddForm.css";
import Categories from "./Categories";

//defining regex expression to only allow numbers for our price
const re = /^[0-9]+$/;

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      type: "",
      title: "",
      description: "",
      priceBool: "Moin Mesta",
      price: "",
      category: "",
      username: this.props.username,
      longitude: "",
      latitude: "",
      photo: null,
    };

    this.logPrice = this.logPrice.bind(this);
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  inputChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  //callback function to check if input price is valid
  priceChange = (input) => (e) => {
    if (re.test(e.target.value)) {
      this.setState({
        price: e.target.value,
      });
    } else {
      this.setState({
        price: "",
      });
    }
  };

  boolChange = (button) => (e) => {
    const { step } = this.state;

    this.setState({
      [button]: e.target.value,
      step: step + 1,
    });
  };

  logPrice() {
    console.log(this.state.priceBool);
  }

  pictureChange = (picture) => {
    this.setState({
      photo: picture[0],
    });
  };

  getLocation = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      const { step } = this.state;
      navigator.geolocation.getCurrentPosition((success) =>
        this.setState({
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
          step: step + 1,
        })
      );
    } else {
      console.log("Not Available");
    }
  };

  setLocationBack = () => {
    this.setState({
      longitude: "",
      latitude: "",
    });
  };

  render() {
    const { step } = this.state;
    const { type, title, description, priceBool, price, category, username, photo, longitude, latitude } = this.state;
    const values = {
      type,
      title,
      description,
      priceBool,
      price,
      category,
      username,
      photo,
      longitude,
      latitude,
    };
    switch (this.state.step) {
      case 1:
        return <Type nextStep={this.nextStep} inputChange={this.inputChange} boolChange={this.boolChange} values={values} />;
      case 2:
        return <TitleDescription nextStep={this.nextStep} prevStep={this.prevStep} inputChange={this.inputChange} boolChange={this.boolChange} values={values} />;
      case 3:
        return <Categories nextStep={this.nextStep} prevStep={this.prevStep} values={values} inputChange={this.inputChange} />
      case 4:
        return (
          <>
            <PriceBool prevStep={this.prevStep} boolChange={this.boolChange} values={values} />
          </>
        );

      case 5:
        if (this.state.priceBool === "true") {
          return <Price prevStep={this.prevStep} nextStep={this.nextStep} values={values} priceChange={this.priceChange} />;
        } else {
          return <Location prevStep={this.prevStep} nextStep={this.nextStep} boolChange={this.boolChange} values={values} geoLocation={this.getLocation} />;
        }
      case 6: {
        if (this.state.priceBool === "true") {
          return <Location prevStep={this.prevStep} boolChange={this.boolChange} geoLocation={this.getLocation} />;
        } else {
          return <Picture prevStep={this.prevStep} nextStep={this.nextStep} pictureChange={this.pictureChange} values={values} setLocationBack={this.setLocationBack} />;
        }
      }

      case 7: {
        if (this.state.priceBool === "true") {
          return <Picture nextStep={this.nextStep} pictureChange={this.pictureChange} values={values} setLocationBack={this.setLocationBack} />;
        } else {
          return <FinishedCard nextStep={this.nextStep} pictureChange={this.pictureChange} values={values} userID={this.props.username} />;
        }
      }

      case 8: {
        return <FinishedCard nextStep={this.nextStep} pictureChange={this.pictureChange} values={values} userID={this.props.username} />;
      }

      default:
        return <h1>Fehler</h1>;
    }

    // case 5:
    //     switch (this.state.priceBool) {
    //         case 'false':
    //             return (
    //                 <Picture nextStep={this.nextStep} values={values} pictureChange={this.pictureChange} />
    //             )

    //         case 'true':
    //             return (
    //                 <Location nextStep={this.nextStep} values={values} boolChange={this.boolChange} />
    //             )

    //     }
  }
}

import React, { Component } from "react";
import axios from "axios";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Container } from "react-bootstrap";
import AddForm from "./components/AddForm/AddForm";
import "./css/Add.css";

const styles = (theme) => ({
  drawer: {
    background: "white",
    padding: 10,
    justifyContent: "center",
  },
  mainContent: {
    display: "flex",
    color: "white",
    height: "100vh",
  },
  element: {
    padding: 20,
    color: "#0051a8",
  },
  formControl: {
    minWidth: 300,
    background: "white",
  },
  button: {
    background: "#0051a8",
    color: "white",
    minWidth: 300,
    border: "1px solid #0051a8",
    "&:hover": {
      background: "white",
      color: "#0051a8",
      border: "1px solid #0051a8",
    },
  },
  cardDrawer: {
    display: "flex",
    justifyContent: "center",
    width: "100vh",
    margin: "auto",
  },
  errorMessage: {
    padding: 20,
    color: "#0051a8",
    minWidth: 300,
  },
});

class Add extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeClose = this.onChangeClose.bind(this);
    this.onChangeOpen = this.onChangeOpen.bind(this);

    this.state = {
      offercard: null,
      type: "Suche",
      title: "",
      description: "",
      price: 0,
      category: "",
      tags: [],
      photo: "",
      user: "",
      open: false,
      errorMessage: "",
      longitude: 0,
      latitude: 0,
    };
  }

  componentDidMount() {
    // !Hier muss der Username von KeyCloak kommen!
    // !Hier müssem kategorien und tags aus  DB kommen !
    axios({
      method: "GET",
      url: "http://localhost:5000/whoami",
      withCredentials: true,
    }).then((response) => {
      console.log(response.data.user.nameID);
      this.setState({
        user: response.data.user.nameID,
      });
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeTags(e) {
    this.setState({
      tags: e.target.value,
    });
  }

  onChangePhoto(photo) {
    this.setState({
      photo: photo[0],
      open: false,
    });
  }
  onChangeOpen() {
    this.setState({
      open: true,
    });
  }
  onChangeClose() {
    this.setState({
      open: false,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", this.state.type);
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("username", this.state.user);
    formData.append("category", this.state.category);
    formData.append("photo", this.state.photo);
    formData.append("longitude", this.state.longitude);
    formData.append("latitude", this.state.latitude);

    // const newOffercard = {
    //   type: this.state.type,
    //   title: this.state.title,
    //   description: this.state.description,
    //   user: this.state.user,
    //   category: this.state.category,
    //   photo: this.state.photo,
    //   longitude: this.state.longitude,
    //   latitude: this.state.latitude
    // }

    // this.setState({
    //   offercard: newOffercard
    // })
    axios
      .post("http://localhost:5000/offercard/add", formData)
      .then((res) => {
        console.log(res.data);
        this.setState({ errorMessage: "false" });
      })
      .catch((error) => {
        console.log("Error while Axios");
        this.setState({ errorMessage: error.message });
      });
  }

  render() {
    const { classes } = this.props;
    let errorMessage;
    let locationMessage;
    //Abfrage ob errorMessage false ist, wenn ja war unsere Axios erfolgreich und Kleinanzeige wurde erstellt.
    //Entsprechend überschreiben wir die Variable errorMessage mit den HTML-Tags die angezeigt werden sollen
    {
      if (this.state.errorMessage === "false") {
        errorMessage = <Typography variant="h6">Kleinanzeige erfolgreich erstellt</Typography>;
        //Hier versuche ich die Eingabefelder zu reseten nach erfolgreichem Erstellen, wirft jedoch strange Fehler
        // this.setState({
        //   title: " ",
        //   description: " ",
        //   category: " ",
        //   price: 0,
        //   tags: " ",
        //   photo: [],
        // });
      } else if (this.state.errorMessage) {
        errorMessage = (
          <Typography variant="h6" color="error">
            Etwas ist schief gelaufen!
          </Typography>
        );
      }
    }
    {
      if (this.state.longitude != 0 && this.state.latitude != 0) {
        locationMessage = <Typography variant="h6"> Standort erfolgreich hinzugefügt</Typography>;
      }
    }
    return (
      <Container className="addContainer">
        <AddForm username={this.state.user} />
      </Container>
    );
  }
}

export default withStyles(styles)(Add);

import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import { Container } from "react-bootstrap";
import './../css/Filter.css';
const styles = {
  root: {
    // "&$checked": {
    //   color: "#0051a8",
    // },
  },
  checked: {},
  mainContent: {
    position: "fixed !important",
    left: "5rem",
    display: "flex",
    flexDirection: "column",
    marginRight: "5rem",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    height: "100vh",
    backgroundColor: "#212227",
  },
  formControl: {
    width: "100%",
    padding: "0.8em",
    marginBottom: "1rem",
    color: "#b6b6b6",
  },
  headline: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
    color: "#b6b6b6",
  },
  button: {
    color: "#b6b6b6",
    paddingLeft: "0",
    marginTop: "5rem",
    backgroundColor: "#637074",
  },

  selectType: {
    // color: '#b6b6b6'
  },
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategories = this.onChangeCategories.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeRadius = this.onChangeRadius.bind(this);
    this.state = {
      categories: [],
      type: "",
      radius: 100,
      radiusStatus: false,
    };
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
    setTimeout(() => {
      this.props.setFilterData(this.state.categories, this.state.type);
    }, 300);
  }

  onChangeRadius(event, value) {
    if (value != this.state.radius) {
      this.setState({
        radius: value,
      });
      console.log("changed", value);
      setTimeout(() => {
        this.props.setFilterData(this.state.categories, this.state.type, this.state.radius, this.state.radiusStatus);
      }, 300);
    }
  }

  removeItem(index) {
    this.setState((prevState) => ({
      categories: prevState.categories.filter((_, i) => i !== index),
    }));
  }
  onChangeCategories(e) {
    if (this.state.categories.includes(e.target.value)) {
      this.removeItem(this.state.categories.indexOf(e.target.value));
    } else {
      this.setState({
        categories: [...this.state.categories, e.target.value],
      });
    }
    setTimeout(() => {
      this.props.setFilterData(this.state.categories, this.state.type, this.state.radius, this.state.radiusStatus);
    }, 300);
  }

  switchRadiusFilter() {
    if (this.state.radiusStatus == false) {
      this.setState({ radiusStatus: true });
    } else {
      this.setState({ radiusStatus: false });
    }
    setTimeout(() => {
      this.props.setFilterData(this.state.categories, this.state.type, this.state.radius, this.state.radiusStatus);
    }, 300);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <FormControl className={classes.formControl}>
          <div className={classes.headline}>Typ</div>
          <Select className={classes.selectType} native labelId="demo-simple-select-label" id="demo-simple-select" required value={this.state.type} onChange={this.onChangeType}>
            <option value={""}>Suche & Biete</option>
            <option value={"Biete"}>Biete</option>
            <option value={"Suche"}>Suche</option>
          </Select>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormControlLabel className="locationSlider" control={<Switch checked={this.state.radiusStatus} onChange={() => this.switchRadiusFilter()} name="checkedB" color="primary" />} label="Suchradius" />
          {this.state.radiusStatus ? (
            <Slider defaultValue={50} aria-labelledby="discrete-slider" valueLabelDisplay="auto" step={10} marks min={10} max={100} onChange={this.onChangeRadius} />
          ) : (
            <i></i>
          )}
          <div className={classes.headline}>Kategorien</div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Dienstleistungen"
                  value="Dienstleistungen"
                  onChange={this.onChangeCategories}
                />
              }
              label="Dienstleistungen"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Imobilien"
                  value="Imobilien"
                  onChange={this.onChangeCategories}
                />
              }
              label="Imobilien"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Freizeit"
                  value="Freizeit"
                  onChange={this.onChangeCategories}
                />
              }
              label="Freizeit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Sport"
                  value="Sport"
                  onChange={this.onChangeCategories}
                />
              }
              label="Sport"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Tiere"
                  value="Tiere"
                  onChange={this.onChangeCategories}
                />
              }
              label="Tiere"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Garten"
                  value="Garten"
                  onChange={this.onChangeCategories}
                />
              }
              label="Garten"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Musik, Filme und Bücher"
                  value="Musik, Filme und Bücher"
                  onChange={this.onChangeCategories}
                />
              }
              label="Medien"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Unterricht und Kurse"
                  value="Unterricht und Kurse"
                  onChange={this.onChangeCategories}
                />
              }
              label="Unterricht und Kurse"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Lernmaterial"
                  value="Lernmaterial"
                  onChange={this.onChangeCategories}
                />
              }
              label="Lernmaterial"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Elektronik"
                  value="Elektronik"
                  onChange={this.onChangeCategories}
                />
              }
              label="Elektronik"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Zu verschenken"
                  value="Zu verschenken"
                  onChange={this.onChangeCategories}
                />
              }
              label="Zu verschenken"
            />
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="Kleidung"
                  value="Kleidung"
                  onChange={this.onChangeCategories}
                />
              }
              label="Kleidung"
            />
          </FormGroup>
        </FormControl>
      </Container>
    );
  }
}

export default withStyles(styles)(Filter);

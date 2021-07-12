import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import OwnOffercard from "./components/OwnOffercard";
import Watchlistcard from "./components/Watchlistcard";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "react-bootstrap";
import "./css/Profil.css";
const styles = (theme) => ({
  header: {
    background: "linear-gradient(45deg, #0051a8 30%, #4298f5  90%)",
    padding: "1vh",
    textAlign: "center",
    color: "white",
    width: "94.96vw",
  },

  leftContent: {
    width: "60%",
    float: "left",
    height: "20vh",
    marginTop: "2%",
  },

  rightContent: {
    width: "40%",
    float: "right",
    height: "20vh",
    marginTop: "2%",
  },

  img: {
    width: "20%",
    height: "auto",
  },
  profileHeader: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10vh",
  },

  profileInfo: {
    paddingLeft: "5%",
  },

  profileText: {
    color: "#0051a8 ",
  },

  profileTextHeader: {
    color: "#0051a8 ",
    fontWeight: "600",
  },

  heading: {
    color: "#0051a8 ",
    marginBottom: "1rem",

    [theme.breakpoints.up("xl")]: {
      paddingTop: 20,
      marginLeft: 70,
    },
    [theme.breakpoints.between("md", "lg")]: {
      paddingTop: 20,
      marginLeft: 65,
    },
    [theme.breakpoints.between("sm", "md")]: {
      paddingTop: 20,
      marginLeft: 65,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      paddingTop: 10,
      marginLeft: 20,
    },
  },
  cardContent: {
    [theme.breakpoints.up("xl")]: { width: "50vw" },
    [theme.breakpoints.between("md", "lg")]: { width: 900 },
    [theme.breakpoints.between("sm", "md")]: { width: 850 },
    [theme.breakpoints.between("xs", "sm")]: { width: 330 },
  },
  smallCardContent: {
    [theme.breakpoints.up("xl")]: { width: "35vw" },
    [theme.breakpoints.between("md", "lg")]: { width: 1180 },
    [theme.breakpoints.between("sm", "md")]: { width: 850 },
    [theme.breakpoints.between("xs", "sm")]: { width: 330 },
  },
  content: {
    [theme.breakpoints.up("xl")]: {},
    [theme.breakpoints.between("md", "lg")]: {},
    [theme.breakpoints.between("sm", "md")]: {},
    [theme.breakpoints.between("xs", "sm")]: {},
    marginTop: "10vh",
  },

  tabs: {
    [theme.breakpoints.up("xl")]: { minWidth: "45%", paddingLeft: 3 },
    [theme.breakpoints.between("md", "lg")]: { minWidth: 400 },
    [theme.breakpoints.between("sm", "md")]: { minWidth: 400 },
    [theme.breakpoints.between("xs", "sm")]: { minWidth: 200 },
  },
  smallTabs: {
    [theme.breakpoints.up("xl")]: { minWidth: "55%", paddingLeft: 3 },
    [theme.breakpoints.between("md", "lg")]: { minWidth: 400 },
    [theme.breakpoints.between("sm", "md")]: { minWidth: 400 },
    [theme.breakpoints.between("xs", "sm")]: { minWidth: 200 },
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offercards: [],
      ownSearchOffercards: [],
      ownOfferOffercards: [],
      username: "",
      watchlistCardsIDs: [],
      watchlist: [],
      userConversations: null,
    };

    this.updateWatchlist = this.updateWatchlist.bind(this);
  }

  async getCurrentUsername() {
    await axios({
      method: "GET",
      url: "http://localhost:5000/whoami",
      withCredentials: true,
    })
      .then((response) => {
        this.setState({ username: response.data.user.nameID });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getCurrentUsername();
    setTimeout(() => {
      if (this.state.username != "") {
        axios
          .get("http://localhost:5000/offercard/gettype", {
            params: { type: "Suche", username: this.state.username },
          })
          .then((response) => {
            this.setState({ ownSearchOffercards: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get("http://localhost:5000/offercard/gettype", {
            params: { type: "Biete", username: this.state.username },
          })
          .then((response) => {
            console.log(response);
            this.setState({ ownOfferOffercards: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get(`http://localhost:5000/user/getWatchlist/${this.state.username}`)
          .then((response) => {
            this.setState({ watchlistCardsIDs: response.data[0].watchlist });
            console.log("hier", response.data[0].watchlist);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 500);
    setTimeout(() => {
      console.log(this.state);
      for (let i = 0; i < this.state.watchlistCardsIDs.length; i++) {
        axios
          .get(`http://localhost:5000/offercard/get/${this.state.watchlistCardsIDs[i]}`)
          .then((response) => {
            console.log(response);
            this.setState((state) => {
              const watchlist = state.watchlist.concat(response.data);

              return {
                watchlist,
              };
            });
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 1000);
    setTimeout(() => {
      console.log(this.state.watchlist);
    }, 2000);

    setTimeout(() => {
      axios.get('http://localhost:5000/conversation/' + this.props.userID)
        .then((res) => { console.log(res.data); this.setState({ userConversations: res.data }) });
    }, 200);
  }

  updateWatchlist(deletedOffercard) {
    var watched = [...this.state.watchlist];

    var newWatched = watched.filter(function (value, index, arr) {
      console.log(value);
      return value._id != deletedOffercard;
    });

    this.setState({
      watchlist: newWatched,
    });

    // }
  }

  render() {
    const { classes } = this.props;

    return (
      <Container className="profilContainer" fluid>
        <Row className=" marginBottomContainer">
          <Col className="offerContainer">
            <div className={classes.heading}>
              <Typography className="TypoColor" variant="h5">
                Meine Suchen
              </Typography>
            </div>
            <Container className={"home-overflow"} fluid>
              <Row sm={1} md={1} lg={3} className="g-4">
                {this.state.ownSearchOffercards.length !== 0 ? (
                  this.state.ownSearchOffercards.map((offercard) => <OwnOffercard offercard={offercard} />)
                ) : (
                  <Col>
                    <Typography className="TypoColor" align="center" variant="h5">
                      Noch Keine Angebote. Erstelle eins!
                    </Typography>
                  </Col>
                )}
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="justify-content-md-center marginBottomContainer">
          <Col className="offerContainer">
            <div className={classes.heading}>
              <Typography className="TypoColor" variant="h5">
                Meine Angebote
              </Typography>
            </div>
            <Container className={"home-overflow"} fluid>
              <Row sm={1} md={1} lg={3}>
                {this.state.ownOfferOffercards.length !== 0 ? (
                  this.state.ownOfferOffercards.map((offercard) => <OwnOffercard offercard={offercard} />)
                ) : (
                  <Col>
                    <Typography className="TypoColor" align="center" variant="h5">
                      Noch Keine Angebote. Erstelle eins!
                    </Typography>
                  </Col>
                )}
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="marginBottomContainer">
          <Col className="offerContainer">
            <div className={classes.heading}>
              <Typography className="TypoColor" variant="h5">
                Merkliste
              </Typography>
            </div>
            <Container className={"home-overflow"} fluid>
              <Row sm={1} md={1} lg={3}>
                {this.state.watchlist.length !== 0 ? (
                  this.state.watchlist.map((offercard) => <Watchlistcard offercard={offercard} userID={this.state.username} updateWatchlist={this.updateWatchlist} userConversations={this.state.userConversations} />)
                ) : (
                  <Col>
                    <Typography className="TypoColor" align="center" variant="h5">
                      Füge einige Angebote zu deiner Merkliste hinzu!
                    </Typography>
                  </Col>
                )}
              </Row>
            </Container>
          </Col>
        </Row>

        {/* <div className={classes.leftContent}>
          <div className={classes.content}>
            <div className={classes.heading}>
              <Typography variant="h5">Watchlist</Typography>
            </div>

            <Tabs textColor="primary" variant="scrollable" scrollButtons="on">
              {this.state.watchlist.map((offercard) => (
                <Tab
                  label={
                    <Watchlistcard
                      description={offercard.description}
                      title={offercard.title}
                      userID={offercard.userID}
                      type={offercard.type}
                      photo={
                        "http://localhost:5000/uploads/" + offercard.photo
                      }
                      id={offercard._id}
                      username={this.state.username}
                    />
                  }
                  classes={{ root: classes.tabs }}
                />
              ))}
            </Tabs>

          </div>
        </div>
        <div className={classes.rightContent}>
          <div className={classes.smallCardContent}>

          </div>
          <div
            style={{ marginTop: "4.1vh" }}
            className={classes.smallCardContent}
          >
            <Tabs textColor="primary" variant="scrollable" scrollButtons="on">
              {this.state.ownOfferOffercards.map((offercard) => (
                <Tab
                  label={
                    <OwnOffercard
                      description={offercard.description}
                      title={offercard.title}
                      _id={offercard._id}
                      type={offercard.type}
                    />
                  }
                  classes={{ root: classes.smallTabs }}
                />
              ))}
            </Tabs>
          </div>
        </div> */}
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);

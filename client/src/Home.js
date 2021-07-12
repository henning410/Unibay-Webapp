import React from "react";
import axios from "axios";
import Offercard from "./components/Offercard.js";
import Filter from "./components/Filter.js";
import { withStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-bootstrap";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "5rem",
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Speichert alle Kleianzeigen
      offercards: [],
      //Speichert den Typ der Kleinanzeigen nach dem gefiltert werden soll
      filterType: "",
      //Speichert die Kategorien der Kleinanzeigen nach denen gefiltert werden soll
      filterCategories: [],
      //Speichert den String, mit dem gesucht wird. Kommt aus dem props
      searchValue: "",
      //speichert radius
      filterRadius: null,
      //speichert ob radius aktiviert ist oder nicht
      radiusStatus: false,
      userConversations: null,
    };
    this.getOffercards = this.getOffercards.bind(this);
  }

  getOffercards = async () => {


    setTimeout(() => {
      axios
        .get("http://localhost:5000/offercard/getOffercards", {
          params: {
            type: this.state.filterType,
            categories: this.state.filterCategories,
            username: this.props.userID
          },
        })
        .then((response) => {
          this.setState({ offercards: [] });

          var tempCards = [];
          if ("geolocation" in navigator && this.state.radiusStatus) {
            navigator.geolocation.getCurrentPosition((position) => {
              response.data.forEach((element) => {
                if (this.arePointsNear(position.coords.longitude, position.coords.latitude, element.longitude, element.latitude, this.state.filterRadius)) {
                  tempCards.push(element);
                }
              });
            });
          } else {
            tempCards = response.data;
          }

          //Wenn der searchValue nicht leer ist wird noch nach dem searchValue gefiltert
          if (this.state.searchValue !== "") {
            setTimeout(() => {
              var buffer = tempCards.filter((offercard) => {
                if (offercard.title.includes(this.state.searchValue)) {
                  this.setState({
                    offercards: [...this.state.offercards, offercard],
                  });
                }
              });
            }, 10);
          } else {
            setTimeout(() => {
              this.setState({ offercards: tempCards });
            }, 10);
            this.setState({ offercards: tempCards });
          }


        })
        .catch((error) => {
          console.log(error);
        });
    }, 200);

  };

  componentDidMount() {
    if (this.props.location !== undefined) {
      if (this.props.location.state !== undefined) {
        if (this.props.location.state.searchValue !== undefined) {
          this.setState({
            searchValue: this.props.location.state.searchValue,
          });
        }
      }
    }

    this.props.getUserConversations();

    this.getOffercards();
  }

  componentDidUpdate(prevProps) {
    //Falls der searchValue geändert wurde, wird er hier aktualisiert
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({
        searchValue: this.props.searchValue,
      });
      this.getOffercards();
    }

    if (prevProps.userConversations !== this.props.userConversations) {
      console.log("New Props")
    }
  }

  setFilter(categories, type, radius, radiusStatus) {
    this.setState({
      filterActive: true,
      filterCategories: categories,
      filterType: type,
      filterRadius: radius,
      radiusStatus: radiusStatus,
    });
    this.getOffercards();
  }

  //method to check if a point is within a specific radius to a center point
  arePointsNear(currentLongitude, currentLatitude, checkLongitude, checkLatitude, km) {
    console.log("berechne Entfernung von Standort: lat:", currentLatitude, " long: ", currentLongitude, " nach lat: ", checkLatitude, " long: ", checkLongitude, " km: ", km);
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * currentLatitude) / 180.0) * ky;
    var dx = Math.abs(currentLongitude - checkLongitude) * kx;
    var dy = Math.abs(currentLatitude - checkLatitude) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <style type="text/css">
          {`
            .HomeContainer {
              margin-top: 84px;
              padding-left: 0;
              height: calc(100vh - 84px);
          
            }

            .HomeRow {
              height: calc(100vh - 84px);
            }

            .offerContainer {
              display: flex;
              padding-bottom: 5rem;
              height: calc(100vh - 84px);
           
            }
            
            .filterContainer {
              max-height: calc(100vh - 84px);
              padding-top: 1rem;
            }

            .home-overflow {
              overflow-y: scroll;
              height: calc(100vh - 84px);
              padding-bottom: 5rem;
              padding-top: 1rem;
            }

            .home-overflow::-webkit-scrollbar {
              width: 0.125rem;
              border-radius: 50%;
            }
            
            .home-overflow::-webkit-scrollbar-thumb {
              background-color: #212227;
            }

            .filterButtonContainer {
              padding-left : 0;
            }
        `}
        </style>

        <Container className="HomeContainer" fluid>
          <Row className="HomeRow">
            <Col lg={3} className="filterContainer">
              <Filter setFilterData={this.setFilter.bind(this)} />
            </Col>
            <Col lg={9} className="offerContainer">
              <Container className={"home-overflow"} fluid>
                <Row sm={1} md={1} lg={3} className="g-4">
                  {this.state.offercards.map((offercard) => (
                    <Offercard offercard={offercard} key={offercard._id} userID={this.props.userID} userConversations={this.props.userConversations} />
                  ))}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withStyles(styles)(Home);

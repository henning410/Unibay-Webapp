import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home";
import Add from "./Add";
import Profile from "./Profile";
import Messenger from "./components/Messenger/Messenger";
import Settings from "./Settings";
import Logout from "./Logout";

import { Route, Switch } from "react-router-dom";
import Search from "./components/Search/Search";
import { Container, Row, Col } from "react-bootstrap";
export class IApplicationProps { }

const Application = (props) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [userConversations, setUserConversations] = useState([]);
  //Speichert einen String, der an Home gegeben wird
  const [searchValue, setSearchValue] = useState("");

  //Bekommt von Search den searchValue
  const getSearchValue = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    console.log("Checking tos ee if we are autheticated from the Backend");

    const loginValidation = async () => {
      await axios({
        method: "GET",
        url: "http://localhost:5000/whoami",
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data.user, "Saml");

          if (response.data.user.nameID) {
            checkIfExistsInDB(response.data.user.nameID);
            setEmail(response.data.user.nameID);
            setLoading(false);

          } else {
            RedirectToLogin();
          }
        })
        .catch((error) => {
          console.log(error + " From Saml");
          RedirectToLogin();
        });
    }

    loginValidation();


    const checkIfExistsInDB = async (nameID) => {
      try {
        const res = await axios.get("http://localhost:5000/user?nameId=" + nameID);

        if (res.data.length === 0) {
          createUser(nameID);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const createUser = async (nameID) => {
      const username = nameID;
      const email = nameID + "@hs-esslingen.de";
      await axios
        .post("http://localhost:5000/user", { username, email })
        .then((res) => console.log(res.data))
        .catch((error) => {
          console.log("Error while Axios");
        });
    };


  }, [email, loading]);

  const getUserConversations = async () => {
    await axios.get("http://localhost:5000/conversation/" + email).then((res) => setUserConversations(res.data));
  }




  const RedirectToLogin = () => {
    // * Wenn nicht eingeloggt: Redirect to Backend. Dieser Link ist von Passport gesichert
    window.location.replace("http://localhost:5000/login");
  };

  // if (loading) return <p> loading...</p>;

  return (
    <>
      <style type="text/css">
        {`
        .appContainer{
          padding-left: 0;
        }
        a {
          color: #b8b8ba;
        }


        .btn-primary:hover {
          background-color: var(--bg-secondary) !important;
          color: var(--text-secondary) !important;
          
        }
        
        .btn-primary {
            color: #212227 !important;
            background-color: transparent;
            border: 1px solid #b6b6b6 !important;
        }

        .btn-primary:active {
          background-color: #b6b6b6;
        }

        .btn-primary:focus{
          background-color: #b6b6ba ;
          box-shadow: 0 0 0 0.25rem var(--bg-secondary)
        }

        .btn-success {
          background-color: var(--bg-secondary);
          border: 1px solid var(--bg-secondary)
        }
        .btn-success:hover {
          background-color: var(--bg-primary);
          border: 1px solid var(--bg-primary)
        }

        .btn-success:active {
          background-color: var(--bg-secondary);
        }

        .btn-success:focus{
          background-color: var(--bg-secondary) ;
          box-shadow: 0 0 0 0.125rem var(--bg-primary) !important
        }

        .btn-success:disabled {
          background-color: var(--bg-primary);
          border: 1px solid var(--bg-primary)
        }

        .btn-primary:disabled {
          background-color: transparent;
          color: var(--bg-secondary) !important;
          border: 1px solid var(--bg-primary);
        }
        
        .TypoColor {
          color: var(--bg-secondary)
        }
                `}
      </style>
      <Container className="appContainer" fluid>
        <Row>
          <Col>
            <Search getSearchValue={getSearchValue} />
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingRight: "0px" }} md="auto">
            <Navbar />
          </Col>
          <Col>
            <Switch>
              <Route exact from="/" render={(props) => <Home {...props} userID={email} searchValue={searchValue} userConversations={userConversations} getUserConversations={getUserConversations} />} />
              <Route exact path="/add" render={(props) => <Add {...props} />} />
              <Route exact path="/profile" render={(props) => <Profile {...props} userID={email} />} />
              <Route exact path="/messenger" render={(props) => <Messenger {...props} userID={email} />} />
              <Route exact path="/settings" render={(props) => <Settings {...props} />} />
              <Route exact path="/logout" render={(props) => <Logout {...props} />} />
            </Switch>
            {/* <p>Hello, I´m Autheticated with {email} </p> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Application;

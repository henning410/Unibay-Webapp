import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavDropdown, Nav, FormControl, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    props.getSearchValue(event.target.value);
  };

  const onClickButton = (event) => {};

  return (
    <>
      <style type="text/css">
        {`
        .navbar-custom {
          background-color: var(--bg-primary)!important;
          color: white !important;
          padding-left: 1rem;
        }
    
        .navbar-brand {
            color: #b8b8ba;
        }

        .nav {
            color: #b8b8ba !important;
        }

        .search-form {
            display: flex;
            justify-content: space-between;
            width: 40%;
        }
        .search-input {
            width: 80% !important;
        }
        .search-button:hover {
            background-color: var(--bg-secondary) !important;
            color: var(--text-secondary) !important;
        }
        .search-button {
            color: var(--bg-secondary) !important;
            border: 1px solid var(--bg-secondary) !important;
        }

        `}
      </style>
      <Navbar variant="custom" fixed="top" bg="light" expand="lg">
        <Navbar.Brand href="#home">UniBay</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
          <Form className="search-form" inline>
            <FormControl className="search-input" type="text" value={searchValue} onChange={handleInputChange} placeholder="Suche nach einer Anzeige" />
            <Link to={{ pathname: "/", state: { searchValue: searchValue } }}>
              <Button className="search-button" variant="outline-success" onClick={onClickButton}>
                Los
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Search;

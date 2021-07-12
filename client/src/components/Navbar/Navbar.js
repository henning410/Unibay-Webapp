import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

const NavBarNew = (props) => {
  const { history } = props;
  const [active, setActive] = useState('home');

  const changeClass = (e) => {
    console.log("Clicked")
    e.target.closest(".custom-nav-item").classList.add("active")
    for (let i = 0; i < e.target.closest(".custom-nav-item").parentNode.childNodes.length; i++) {
      if (e.target.closest(".custom-nav-item").parentNode.childNodes[i] !== e.target.closest(".custom-nav-item")) {
        e.target.closest(".custom-nav-item").parentNode.childNodes[i].classList.remove('active');
      }
    }
    console.log(e.target.closest(".custom-nav-item").parentNode.childNodes[2]);
  }
  //erstellen eines Arrays um später leichter navbar erstellen zu können
  return (
    <>
      {/* <Drawer open variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
        <GridList cellHeight={80} cols={1} spacing={40} className={classes.gridlist}>
          <GridListTile></GridListTile>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <GridListTile>
                <Tooltip title={text}>
                  <IconButton onClick={onClick} color="primary">
                    {icon}
                  </IconButton>
                </Tooltip>
              </GridListTile>
            );
          })}
        </GridList>
      </Drawer> */}
      <nav className="custom-navbar">
        <ul className="custom-navbar-nav">
          <li className="custom-logo">
            <div className="custom-nav-link">
              <i className="fas fa-door-open fa-primary"></i>
              <span className="custom-link-text">UniBay</span>
            </div>
          </li>
          <li className="custom-nav-item">
            <Link to="/" className="custom-nav-link" onClick={changeClass}>
              <i className="fas fa-home fa-primary"></i>
              <span className="custom-link-text">Home</span>
            </Link>
          </li>
          <li className="custom-nav-item">
            <Link to="/add" className="custom-nav-link" onClick={changeClass}>
              <i className="fas fa-plus fa-primary"></i>
              <span className="custom-link-text">Neue Anzeige</span>
            </Link>
          </li>
          <li className="custom-nav-item">
            <Link to="/profile" className="custom-nav-link" onClick={changeClass}>
              <i className="fas fa-user fa-primary"></i>
              <span className="custom-link-text">Profil</span>
            </Link>
          </li>
          <li className="custom-nav-item">
            <Link to="/messenger" className="custom-nav-link" onClick={changeClass}>
              <i className="fas fa-comment-alt fa-primary"></i>
              <span className="custom-link-text">Nachrichten</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default withRouter(NavBarNew);

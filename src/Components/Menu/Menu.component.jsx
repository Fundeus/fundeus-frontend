import React from "react";

import { Link } from "react-router-dom";
import routes from "Constants/route.constants";
import Logo from "Assets/logo.png";
import "./Menu.styles.scss";

const Menu = (props) => {
  const { path } = props;
  return (
    <div className="menu-contianer">
      <img alt="Fundeus Logo" className="menu-logo" src={Logo} />
      <div className="menu-links">
        <Link to={routes.home}>Home</Link>
        <Link to={routes.concept}>How it Works</Link>
        <Link to={routes.about}>About</Link>
      </div>
    </div>
  );
};

export default Menu;

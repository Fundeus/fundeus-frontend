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
        <Link to={routes.home} className={path === routes.home ? "active" : ""}>
          Home
        </Link>
        <Link
          to={routes.getDiagnosed}
          className={path === routes.getDiagnosed ? "active" : ""}
        >
          Get Diagnosed
        </Link>
        <Link
          to={routes.project}
          className={path === routes.project ? "active" : ""}
        >
          Project Details
        </Link>
        <Link
          to={routes.about}
          className={path === routes.about ? "active" : ""}
        >
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Menu;

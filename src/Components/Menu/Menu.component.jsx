import React, { useState } from "react";

import { Link } from "react-router-dom";
import routes from "Constants/route.constants";
import Logo from "Assets/logo.png";
import "./Menu.styles.scss";

const Menu = (props) => {
  const { path, history } = props;
  const [showMenu, setShowMenu] = useState(false);

  const onLinkClick = () => {
    if (setShowMenu) {
      setShowMenu(false);
    }
  };

  const menuItems = (
    <div className="menu-links">
      <Link
        to={routes.home}
        className={path === routes.home ? "active" : ""}
        onClick={onLinkClick}
      >
        Home
      </Link>
      <Link
        to={routes.getDiagnosed}
        className={path === routes.getDiagnosed ? "active" : ""}
        onClick={onLinkClick}
      >
        Get Diagnosed
      </Link>
      <Link
        to={routes.project}
        className={path === routes.project ? "active" : ""}
        onClick={onLinkClick}
      >
        Project Details
      </Link>
      <Link
        to={routes.about}
        className={path === routes.about ? "active" : ""}
        onClick={onLinkClick}
      >
        About Us
      </Link>
    </div>
  );

  return (
    <>
      <div className="menu-contianer">
        <Link to={routes.home}>
          <img alt="Fundeus Logo" className="menu-logo" src={Logo} />
        </Link>
        {menuItems}
      </div>
      <div className={`menu-mobile-container ${showMenu ? "open" : "closed"}`}>
        <div className="menu-mobile-header-row">
          <Link to={routes.home} onClick={onLinkClick}>
            <img alt="Fundeus Logo" className="menu-logo" src={Logo} />
          </Link>
          <i
            onClick={() => setShowMenu(!showMenu)}
            className={showMenu ? "fas fa-times" : "fas fa-bars"}
            role="menu"
          />
        </div>
        {showMenu && menuItems}
      </div>
    </>
  );
};

export default Menu;

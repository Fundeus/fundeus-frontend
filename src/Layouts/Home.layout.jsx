import React from "react";

import Menu from "Components/Menu/Menu.component";
import "./HomeLayout.styles.scss";

const HomeLayout = (props) => {
  const { path, children } = props;
  console.log(props, "props");
  return (
    <div className="base-container">
      <Menu path={path} />
      <div className="base-content-container">{children}</div>
    </div>
  );
};

export default HomeLayout;

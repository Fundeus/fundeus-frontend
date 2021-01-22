import React from "react";
import Lottie from "react-lottie";

import FundeusLoaderData from "Assets/lottie/fundeus-loader.json";
import FundeusLoaderDataS from "Assets/lottie/fundeus-loader-1.json";

import "./Loader.styles.scss";

const Loader = (props) => {
  const { big, centered, connection, description, style, darkTheme } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: FundeusLoaderData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const animationSize = {
    height: big ? 200 : 50,
    width: big ? 200 : 50,
  };

  const containerClassNames = [
    "f-loader",
    big && "big",
    centered && "centered",
    darkTheme && "dark-theme",
  ];

  return (
    <div className={containerClassNames.join(" ")} style={style}>
      <Lottie
        options={defaultOptions}
        height={animationSize.height}
        width={animationSize.width}
        isStopped={false}
        isPaused={false}
      />
      {description && <div className="description">{description}</div>}
    </div>
  );
};

export default Loader;

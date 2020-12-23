import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import routes from "Constants/route.constants";
import Home from "Components/Home/Home.component";
import About from "Components/About/About.component";
import Concept from "Components/Concept/Concept.component";
import HomeRoute from "Routes/HomeRoute";

console.log("routes.concept", routes.concept);
const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <HomeRoute exact path={routes.home} component={Home} />
      <HomeRoute exact path={routes.concept} component={Concept} />
      <HomeRoute exact path={routes.about} component={About} />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;

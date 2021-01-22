import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import routes from "Constants/route.constants";
import Home from "Components/Home/Home.component";
import DiagnoseResult from "Components/DiagnoseResult/DiagnoseResult.component";
import About from "Components/About/About.component";
import Diagnose from "Components/Diagnose/Diagnose.component";
import Project from "Components/Project/Project.component";
import HomeRoute from "Routes/HomeRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <HomeRoute exact path={routes.home} component={Home} />
      <HomeRoute exact path={routes.getDiagnosed} component={Diagnose} />
      <HomeRoute exact path={routes.about} component={About} />
      <HomeRoute exact path={routes.results} component={DiagnoseResult} />
      <HomeRoute exact path={routes.project} component={Project} />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;

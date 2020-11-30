import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default () => (
  <BrowserRouter>
    <Switch>
      {/* Dashboard Route should be authentication protected. */}

      {/* Not Found Component */}
      <Route component={NotFoundComponent} />
    </Switch>
  </BrowserRouter>
);

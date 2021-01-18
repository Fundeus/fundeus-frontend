import React from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomeLayout from "Layouts/Home.layout.jsx";

const HomeRoute = (props) => {
  const { component: Component, path } = props;

  return (
    <HomeLayout path={path}>
      {<Route exact path={path} render={(props) => <Component {...props} />} />}
    </HomeLayout>
  );
};

const mapStateToProps = (state) => ({
  diagnose: state.account,
});

const actionCreators = {};

export default withRouter(connect(mapStateToProps, actionCreators)(HomeRoute));

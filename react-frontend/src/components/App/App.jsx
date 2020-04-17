import React from "react";
import "../../assets/styles/global.scss";

// Import pages to route to
import Home from "../pages/Home";

import { Switch, Route, withRouter } from "react-router-dom";

const App = ({ history }) => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default withRouter(App);

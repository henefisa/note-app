import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { HomePage, NotePage } from "./pages";
import { ROUTES } from "./constants/ROUTES";

const App: React.FC = () => {
  return (
    <div className="app">
      <HashRouter>
        <Switch>
          <Route path={ROUTES.HOME} component={HomePage} exact />
          <Route path={ROUTES.NOTE_ID} component={NotePage} exact />
          {/* <Route path={ROUTES.NOTE} component={NotePage} exact /> */}
        </Switch>
      </HashRouter>
    </div>
  );
};

export default React.memo(App);

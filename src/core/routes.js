import React from "react";
import { Switch } from "react-router-dom";
import Route from "core/misc/route";

import mainPage  from "pages/main";
import errorPage from "pages/common/error";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={mainPage} />
        <Route component={errorPage} />
    </Switch>
);

export default Routes;

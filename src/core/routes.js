import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'matsumoto/src/core/misc/route';
import errorPage from 'matsumoto/src/pages/common/error';
import mainPage from 'pages/main';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={mainPage} />
        <Route component={errorPage} />
    </Switch>
);

export default Routes;

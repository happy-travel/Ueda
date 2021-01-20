import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'matsumoto/src/core/misc/route';
import errorPage from 'matsumoto/src/pages/common/error';
import mainPage from 'pages/main';
import counterpartiesListPage from 'pages/counterparties/list';
import counterpartiesItemPage from 'pages/counterparties/counterparty';
import agencyPage from 'pages/agency/agency';
import createPaymentLink from 'pages/paymentlinks/create';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={mainPage} />
        <Route exact path="/counterparties/:id" component={counterpartiesItemPage} />
        <Route exact path="/counterparties" component={counterpartiesListPage} />
        <Route exact path="/counterparties/agencies/:id" component={agencyPage} />
        <Route exact path="/paymentlinks" component={createPaymentLink} />
        <Route component={errorPage} />
    </Switch>
);

export default Routes;

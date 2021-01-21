import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'matsumoto/src/core/misc/route';
import errorPage from 'matsumoto/src/pages/common/error';
import authLogout from 'matsumoto/src/core/auth/logout';
import mainPage from 'pages/main';
import counterpartiesListPage from 'pages/counterparties/list';
import counterpartiesItemPage from 'pages/counterparties/counterparty';
import agencyPage from 'pages/agency/agency';
import createPaymentLinkPage from 'pages/paymentlinks/create';
import inviteAdminPage from 'pages/admins/invite';
import acceptInvite from 'pages/account/accept-invite';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={mainPage} />
        <Route exact path="/counterparties/:id" component={counterpartiesItemPage} />
        <Route exact path="/counterparties" component={counterpartiesListPage} />
        <Route exact path="/counterparties/agencies/:id" component={agencyPage} />
        <Route exact path="/paymentlinks" component={createPaymentLinkPage} />
        <Route exact path="/admins" component={inviteAdminPage} />
        <Route exact path="/logout" component={authLogout} />
        <Route path="/signup/invite/:email/:code" component={acceptInvite} title="Sign Up" />
        <Route component={errorPage} />
    </Switch>
);

export default Routes;

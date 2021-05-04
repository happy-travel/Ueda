import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'matsumoto/src/core/misc/route';
import notFoundPage from 'matsumoto/src/pages/common/not-found-page';
import acceptInvite from 'matsumoto/src/pages/signup/accept-invite';
import mainPage from 'pages/main';
import counterpartiesListPage from 'pages/counterparties/list';
import counterpartiesItemPage from 'pages/counterparties/counterparty';
import agencyPage from 'pages/agency/agency';
import agentPage from 'pages/agency/agent';
import createPaymentLinkPage from 'pages/paymentlinks/create';
import inviteAdminPage from 'pages/admins/invite';
import duplicatesListPage from 'pages/duplicates/list';
import globalMarkupsPage from 'pages/global-markups/global-markups';
import duplicatePage from 'pages/duplicates/duplicate';
import bookingPage from 'pages/bookings/booking';
import reportsPage from 'pages/reports/reports';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={mainPage} />
        <Route exact path="/counterparties/:id" component={counterpartiesItemPage} />
        <Route exact path="/counterparties" component={counterpartiesListPage} />
        <Route exact path="/counterparties/agencies/:id" component={agencyPage} />
        <Route exact path="/counterparties/agencies/:id/agents/:agentId" component={agentPage} />
        <Route exact path="/paymentlinks" component={createPaymentLinkPage} />
        <Route exact path="/admins" component={inviteAdminPage} />
        <Route exact path="/duplicates/:id" component={duplicatePage} />
        <Route exact path="/duplicates" component={duplicatesListPage} />
        <Route exact path="/globalmarkups" component={globalMarkupsPage} />
        <Route path="/signup/invite/:email/:code" component={acceptInvite} title="Sign Up" />
        <Route exact path="/reports" component={reportsPage} />
        <Route exact path="/counterparties/agencies/booking/:refCode" component={bookingPage} />
        <Route component={notFoundPage} />
    </Switch>
);

export default Routes;

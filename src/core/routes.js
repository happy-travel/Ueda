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
import bookingsPage from 'pages/bookings/bookings-page';
import reportsPage from 'pages/reports/reports';
import CounterPartyTransferBalancePage from '../pages/counterparties/counterparty-transfer-balance';
import CounterPartyMarkupManagerPage from '../pages/counterparties/counterparty-markup-manager';
import CounterPartyAgenciesPage from '../pages/counterparties/counterparty-agencies';
import CounterpartyDetailsPage from '../pages/counterparties/counterparty-details';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={mainPage} />
        <Route exact path="/counterparties" component={counterpartiesListPage} />
        <Route exact path="/counterparties/:id/transfer-balance" component={CounterPartyTransferBalancePage} />
        <Route exact path="/counterparties/:id/markup-manager" component={CounterPartyMarkupManagerPage} />
        <Route exact path="/counterparties/:id/agencies" component={CounterPartyAgenciesPage} />
        <Route exact path="/counterparties/:id/details" component={ CounterpartyDetailsPage} />
        <Route exact path="/counterparties/:id" component={counterpartiesItemPage} />
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
        <Route exact path="/bookings" component={bookingsPage} />
        <Route component={notFoundPage} />
    </Switch>
);

export default Routes;


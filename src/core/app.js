import 'matsumoto/styles';
import '../../styles';

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import ScrollToTop from 'matsumoto/src/core/misc/scroll-to-top';
import history from 'matsumoto/src/core/misc/history';
import AuthCallback from 'matsumoto/src/core/auth/callback';
import AuthSilent from 'matsumoto/src/core/auth/silent';
import authLogout from 'matsumoto/src/core/auth/logout';
import Footer from 'matsumoto/src/parts/footer';
import { Loader } from 'matsumoto/src/simple';
import { Authorized, isPageAvailableAuthorizedOnly } from 'matsumoto/src/core/auth';
import internationalization from 'core/internationalization';
import AuthDefault from 'core/auth/default';
import Header from 'parts/header';
import Routes from 'core/routes';
import NotificationList from 'matsumoto/src/parts/notifications/list';

const App = () => {
    const canShowContent = !isPageAvailableAuthorizedOnly() || Authorized();
    return (
        <I18nextProvider i18n={internationalization}>
            <Router history={history}>
                <NotificationList />
                <div className="body-wrapper">
                    <Switch>
                        <Route exact path="/auth/callback" component={ AuthCallback } />
                        <Route exact path="/auth/silent" component={ AuthSilent } />
                        <Route exact path="/logout" component={authLogout} />
                        <Route>
                            <Route component={ AuthDefault } />
                            { canShowContent ? <React.Fragment>
                                <div className="block-wrapper">
                                    <Route component={ Header } />
                                    <Routes />
                                </div>
                                <Route component={ Footer } />
                            </React.Fragment> : <Loader page /> }
                        </Route>
                    </Switch>
                </div>

                <ScrollToTop />
            </Router>
        </I18nextProvider>
    );
};

export default App;

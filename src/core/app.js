import 'matsumoto/styles';
import '../../styles';

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import history from 'matsumoto/src/core/misc/history';
import AuthCallback from 'matsumoto/src/core/auth/callback';
import AuthSilent from 'matsumoto/src/core/auth/silent';
import AuthLogout from 'matsumoto/src/core/auth/logout';
import Footer from 'matsumoto/src/parts/footer/footer';
import { Loader } from 'matsumoto/src/components/simple';
import { Authorized, isPageAvailableAuthorizedOnly } from 'matsumoto/src/core/auth';
import internationalization from 'core/internationalization';
import AuthDefault from 'core/auth/default';
import Header from 'parts/header';
import SideBar from 'parts/side-bar';
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
                        <Route exact path="/auth/callback" component={AuthCallback} />
                        <Route exact path="/auth/silent" component={AuthSilent} />
                        <Route exact path="/logout" component={AuthLogout} />
                        <Route>
                            <Route component={ AuthDefault } />
                            { canShowContent ?
                                <>
                                    <Route component={ Header } />
                                    <div className="nav-wrapper">
                                        <Route component={ SideBar } />
                                        <div className="block-wrapper">
                                            <Routes />
                                        </div>
                                    </div>
                                    <Route component={ Footer } />
                                </> :
                                <Loader page />
                            }
                        </Route>
                    </Switch>
                </div>
            </Router>
        </I18nextProvider>
    );
};

export default App;

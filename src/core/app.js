import 'matsumoto/styles';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import ScrollToTop from 'matsumoto/src/core/misc/scroll-to-top';
import AuthCallback from 'matsumoto/src/core/auth/callback';
import AuthSilent from 'matsumoto/src/core/auth/silent';
import AuthDefault from 'matsumoto/src/core/auth/default';
import Footer from 'matsumoto/src/parts/footer';
import TopAlert from 'matsumoto/src/parts/top-alert';
import Modal from 'matsumoto/src/parts/modal';
import { Loader } from 'matsumoto/src/simple';
import { Authorized, isPageAvailableAuthorizedOnly } from 'matsumoto/src/core/auth';
import internationalization from 'core/internationalization';
import Header from 'parts/header';
import Routes from 'core/routes';

const App = () => {
    const canShowContent = !isPageAvailableAuthorizedOnly() || Authorized();
    return (
        <I18nextProvider i18n={internationalization}>
            <BrowserRouter>
                <div className="body-wrapper">
                    <Switch>
                        <Route exact path="/auth/callback" component={ AuthCallback } />
                        <Route exact path="/auth/silent" component={ AuthSilent } />
                        <Route>
                            <Route component={ AuthDefault } />
                            { canShowContent ? <React.Fragment>
                                <div className="block-wrapper">
                                    <Route component={ Header } />
                                    <TopAlert />
                                    <Routes />
                                </div>
                                <Route component={ Footer } />
                            </React.Fragment> : <Loader page /> }
                        </Route>
                    </Switch>
                </div>
                <Modal />

                <ScrollToTop />
            </BrowserRouter>
        </I18nextProvider>
    );
};

export default App;

import React from 'react';
import { observer } from 'mobx-react';
import CounterpartiesList from 'pages/list';
import VerifyPage from 'pages/verify';

@observer
class UedaMainPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CounterpartiesList />
                <VerifyPage />
            </React.Fragment>
        );
    }
}

export default UedaMainPage;

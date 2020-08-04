import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import CounterpartiesList from 'pages/list';
import VerifyPage from 'pages/verify';

@observer
class UedaMainPage extends React.Component {
    render() {
        // eslint-disable-next-line no-unused-vars
        var { t } = useTranslation();
        return (
            <React.Fragment>
                <CounterpartiesList />
                <VerifyPage />
            </React.Fragment>
        );
    }
}

export default UedaMainPage;

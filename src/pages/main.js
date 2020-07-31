import React from 'react';
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import CounterpartiesList from "./list";
import VerifyPage from "./verify";

@observer
class UedaMainPage extends React.Component {
    render () {
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

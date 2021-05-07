import React from 'react';
import CounterpartyNavigation from './counterparty-navigation';

const CounterPartyMarkupManager = ({ match }) => {
    return (
        <div>
            <CounterpartyNavigation match={match} />
            Компонент
        </div>
    )
}

export default CounterPartyMarkupManager;
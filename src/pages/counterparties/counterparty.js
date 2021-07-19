import React from 'react';
import CounterpartyNavigation from './counterparty-navigation';

const CounterpartyPage = ({ match }) => {

    return (
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
        </div>
    )
}


export default CounterpartyPage;


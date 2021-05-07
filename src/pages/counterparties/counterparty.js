import React from 'react';
import { NavLink, Switch } from 'react-router-dom';
import CounterpartyNavigation from './counterparty-navigation';
import Route from 'matsumoto/src/core/misc/route';

const CounterpartyPage = ({ match }) => {

    return (
        <div>
            <section>
                Текст
            </section>
            {/*<CounterpartyNavigation match={match} />*/}
            <CounterpartyNavigation match={match} />

        </div>

    )
}


export default CounterpartyPage;

import React from 'react';
import { NavLink } from 'react-router-dom';
import CounterpartyHeader from './counterparty-header';


const CounterpartyNavigation = ({ match }) => {
    const { id } = match.params
    return (
        <div>
            <CounterpartyHeader id={id} />
            <div className="counterparty-tabs-navigation">
                <section>
                    <NavLink to={`/counterparties/${id}/details`}>
                        Counterparty Details
                    </NavLink>
                    <NavLink to={`/counterparties/${id}/transfer-balance`}>
                        Balance
                    </NavLink>
                    <NavLink to={`/counterparties/${id}/agencies`}>
                        Agencies
                    </NavLink>
                    <NavLink to={`/counterparties/${id}/markup-manager`}>
                        Markup Management
                    </NavLink>
                </section>
            </div>
        </div>
    )
}

export default CounterpartyNavigation;


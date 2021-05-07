import React from 'react';
import { NavLink } from 'react-router-dom';


const CounterpartyNavigation = ({ match }) => {
    return (
        <div className="counterparty-tabs-navigation">
            <section>
                <NavLink to={`/counterparties/${match.params.id}/transfer-balance`}>
                    Balance
                </NavLink>
                <NavLink to={`/counterparties/${match.params.id}/markup-manager`}>
                    Another page
                </NavLink>
            </section>
        </div>
    )
}

export default CounterpartyNavigation;
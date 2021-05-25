import React from 'react';
import { NavLink } from 'react-router-dom';


const CounterpartyNavigation = ({ match }) => {
    const { id } = match.params
    return (
        <section style={{ height: '34px' }} className="counterparty-tabs-navigation">
            <NavLink to={`/counterparties/${id}/transfer-balance`}>
                Balance
            </NavLink>
            <NavLink to={`/counterparties/${id}/markup-manager`}>
                Markups
            </NavLink>
            <NavLink to={`/counterparties/${id}/agencies`}>
                Agencies
            </NavLink>
            <NavLink to={`/counterparties/${id}/details`}>
                Details
            </NavLink>
        </section>
    )
}

export default CounterpartyNavigation;


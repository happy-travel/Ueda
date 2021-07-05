import React from 'react';
import { NavLink } from 'react-router-dom';

const CounterpartyTransferBalanceNavigation = ({ match }) => {
    return (
        <div className="counterparty-balance-tabs-navigation">
            <NavLink to={`/counterparties/${match.params.id}/transfer-balance/account-operations`}>
                Account Operations
            </NavLink>
            <NavLink to={`/counterparties/${match.params.id}/transfer-balance/actions`}>
                Transfer Balance
            </NavLink>
        </div>
    )
}

export default CounterpartyTransferBalanceNavigation;
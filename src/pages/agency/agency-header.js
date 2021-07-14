import React, { useState, useEffect } from 'react';
import { price } from 'matsumoto/src/simple';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';


const AgencyHeader = ({ id }) => {
    const [agencyAccounts, setAgencyAccounts] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.agenciesAccounts(id),
            success: (agencyAccounts) => setAgencyAccounts(agencyAccounts),
        });
    }, [])

    return (
        <div className="counterparty-header">
        <h1>Agency #{id}</h1>
            {Boolean(agencyAccounts) &&
            <h4>
                Balance: {price(agencyAccounts?.[0]?.balance.currency, agencyAccounts?.[0]?.balance.amount)}
            </h4>
            }
    </div>)
}

export default AgencyHeader;
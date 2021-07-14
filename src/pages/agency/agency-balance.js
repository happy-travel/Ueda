import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import AgencyHeader from './agency-header';

const AgencyBalance = ({ match }) => {
    const [agencyAccounts, setAgencyAccounts] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.agenciesAccounts(match.params.id),
            success: (agencyAccounts) => setAgencyAccounts(agencyAccounts),
        });
    }, [])

    return (
        <div className="page-content">
            <AgencyHeader id={match.params.id}/>
            <AgencyNavigation match={match}/>
        </div>
    )
}

export default AgencyBalance;
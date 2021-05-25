import React from 'react';
import AgencyNavigation from './agency-navigation';
import AgentsList from './agents';

const AgenciesList = ({ match }) => {
    return (
        <section>
            <AgencyNavigation match={match} />
            <AgentsList id={match.params.id} />
        </section>
    )
}

export default AgenciesList;
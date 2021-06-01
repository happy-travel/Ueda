import React from 'react';
import AgencyNavigation from './agency-navigation';
import AgentsList from './agents';

const AgenciesList = ({ match }) => {
    return (
        <>
            <AgencyNavigation match={match}/>
            <section>
                <AgentsList id={match.params.id}/>
            </section>
        </>
    )
}

export default AgenciesList;
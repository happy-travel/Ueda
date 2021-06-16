import React from 'react';
import AgencyNavigation from './agency-navigation';
import AgentsList from './agents';

const AgenciesList = ({ match }) => {
    return (
        <div className="general-page-content">
            <AgencyNavigation match={match}/>
            <section>
                <AgentsList id={match.params.id}/>
            </section>
        </div>
    )
}

export default AgenciesList;
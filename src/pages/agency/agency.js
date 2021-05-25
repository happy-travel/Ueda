import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const AgencyPage = ({ match }) => {

    const activate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.activateAgency(match.params.id),
            body: { reason },
            success: () => Notifications.addNotification('Agency activated', null, 'success')
        });
    }

    const deactivate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.deactivateAgency(match.params.id),
            body: { reason },
            success: () => Notifications.addNotification('Agency deactivated', null, 'success')
        });
    }
    return (
        <div className="settings block">
            <section>
                <AgencyNavigation match={match} />
                <h1>Agency #{match.params.id}</h1>
                <div className="buttons">
                    <button className="button" onClick={activate}>Activate</button>
                    <button className="button" onClick={deactivate}>Deactivate</button>
                </div>
            </section>
        </div>
    );
}

export default AgencyPage;

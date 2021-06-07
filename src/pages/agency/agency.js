import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const AgencyPage = ({ match }) => {
    const [bookings, setBookings] = useState(null);
    const [availabilitySearchOptions, setAvailabilitySearchOptions] = useState(null);
    const [agencyAccounts, setAgencyAccounts] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.bookingsByAgency(match.params.id),
            success: (bookings) => {setBookings(bookings)}
        });
        API.get({
            url: apiMethods.agenciesAccounts(match.params.id),
            success: (agencyAccounts) => setAgencyAccounts(agencyAccounts),
        });
        API.get({
            url: apiMethods.availabilitySearchOptions(match.params.id),
            success: (availabilitySearchOptions) => {
                // Убрать условие, когда изменят ответ пустых настроек style={{
                if(availabilitySearchOptions) {
                    setAvailabilitySearchOptions({
                        ...availabilitySearchOptions,
                        enabledSuppliers: Object.keys(availabilitySearchOptions
                            .enabledSuppliers)
                            .reduce(( a, key ) => (a[key] = true, a), {})
                    })
                }

            },
            error: setAvailabilitySearchOptions(false)
        });
    }, [])

    const submitDisplayedPaymentOptions = (values) => {
        API.put({
            url: apiMethods.displayedPaymentOptions(match.params.id),
            body: values.displayedPaymentOptions,
            success: () => Notifications.addNotification('Saved', null, 'success')
        });
    }

    const submitAvailabilitySearchOptions = (values) => {
        API.put({
            url: apiMethods.availabilitySearchOptions(match.params.id),
            body: {
                values,
                enabledSuppliers: values
                    .enabledSuppliers
                    .keys()
                    .map((item) => values.enabledSuppliers[item] && item)
                    .filter((item) => item)
            },
            success: () => Notifications.addNotification('Saved', null, 'success')
        });
    }

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
            <AgencyNavigation match={match} />
            <section>
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

import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import SearchOptionsForm from './search-options-form';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const AgencySettings = ({ match }) => {
    const [availabilitySearchOptions, setAvailabilitySearchOptions] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.availabilitySearchOptions(match.params.id),
            success: (availabilitySearchOptions) => {
                setAvailabilitySearchOptions({
                    ...availabilitySearchOptions,
                    enabledSuppliers: Object.keys(availabilitySearchOptions
                        .enabledSuppliers)
                        .reduce(( a, key ) => (a[key] = true, a), {})
                })
            },
            error: setAvailabilitySearchOptions(false)
        })
    }, []);

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

    return (
        <>
            <AgencyNavigation match={match}/>
            <section>
                <SearchOptionsForm
                    id={match.params.id}
                />
            </section>
        </>
    )
}

export default AgencySettings;
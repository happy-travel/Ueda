import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import apiMethods from 'core/methods';
import SearchOptionsForm from './search-options-form';
import Bookings from 'parts/bookings/bookings';
import Notifications from 'matsumoto/src/stores/notifications-store';

const AgencyPage = ({ match }) => {

    const [agent, setAgent] = useState({});
    const [bookings, setBookings] = useState([]);
    const [availabilitySearchOptions, setAvailabilitySearchOptions] = useState([]);

    useEffect(() => {
        API.get({
            url: apiMethods.agencyAgents(match.params.id),
            success: (list) => {
                setAgent(list.filter((item) => item.agentId === Number(match.params.agentId))[0])
            }
        });
        API.get({
            url: apiMethods.agentSettingsAvailabilitySearch(match.params.id, match.params.agentId),
            success: (availabilitySearchOptions) => {setAvailabilitySearchOptions(availabilitySearchOptions)}
        });
        API.get({
            url: apiMethods.bookingsByAgent(match.params.agentId),
            success: (bookings) => {setBookings(bookings)}
        })

    }, [])

    const changeAgency = (values) => {
        API.post({
            url: apiMethods.agentChangeAgency(match.params.id, match.params.agentId),
            body: values.newAgencyId,
            success: () => Notifications.addNotification('Changed', null, 'success')
        })
    }

    const submitAvailabilitySearchOptions = (values) => {
        API.put({
            url: apiMethods.agentSettingsAvailabilitySearch(match.params.id, match.params.agentId),
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
        <div className="settings block page-content-no-tabs">
            <section>
                <h1>Agent #{match.params.agentId} (Agency #{match.params.id})</h1>
                <h3>Name: {agent.name}</h3>
                <h3>Created: {date.format.a(agent.created * 1000)}</h3>
                <h3>Markup: {agent.markupSettings}</h3>
                <h3>{agent.isActive ? 'Active' : 'Inactive'}</h3>
            </section>
            <section>
                <h1>Availability Search Options</h1>
                <SearchOptionsForm
                    initialValues={availabilitySearchOptions}
                    onSubmit={submitAvailabilitySearchOptions}
                />
            </section>
            <section>
                <h1>Change Agency</h1>

                <CachedForm
                    enableReinitialize
                    onSubmit={changeAgency}
                    render={(formik) => (
                        <div className="form">
                            <div className="row">
                                <FieldText formik={formik}
                                           id="newAgencyId"
                                           label="New Agency ID"
                                           numeric
                                />
                            </div>
                            <div className="row submit-holder">
                                <div className="field">
                                    <div className="inner">
                                        <button type="submit" className="button">
                                            Change Agency
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </section>
            <section>
                <Bookings
                    bookings={bookings}
                />
            </section>
        </div>
    );
}

export default AgencyPage;

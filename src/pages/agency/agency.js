import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import { API } from 'matsumoto/src/core';
import { CachedForm, FieldSelect } from 'matsumoto/src/components/form';
import apiMethods from 'core/methods';
import AgentsList from './agents';
import SearchOptionsForm from './search-options-form';
import Bookings from 'parts/bookings/bookings';
import Notifications from 'matsumoto/src/stores/notifications-store';
import { price } from 'matsumoto/src/simple';

const AgencyPage = ({ match }) => {
    const [displayedPaymentOptions, setDisplayedPaymentOptions] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [availabilitySearchOptions, setAvailabilitySearchOptions] = useState(null);
    const [agencyAccounts, setAgencyAccounts] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.displayedPaymentOptions(match.params.id),
            success: (displayedPaymentOptions) => setDisplayedPaymentOptions(displayedPaymentOptions),
            error: setDisplayedPaymentOptions(false)
        })
        API.get({
            url: apiMethods.bookingsByAgency(match.params.id),
            success: (bookings) => {setBookings(bookings)}
        })
        API.get({
            url: apiMethods.agenciesAccounts(match.params.id),
            success: (agencyAccounts) => setAgencyAccounts(agencyAccounts),
        })
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
            <section>
                <AgencyNavigation match={match} />
                <h1>Agency #{match.params.id}</h1>
                <div className="buttons">
                    <button className="button" onClick={activate}>Activate</button>
                    <button className="button" onClick={deactivate}>Deactivate</button>
                </div>
            </section>
            <section>
                {Boolean(agencyAccounts) &&
                <h2>Balance: {price(agencyAccounts?.[0]?.balance.currency, agencyAccounts?.[0]?.balance.amount)}</h2>}
            </section>
            <section>
                <h1>Displayed Payment Options</h1>

                <CachedForm
                    initialValues={{
                        displayedPaymentOptions: displayedPaymentOptions
                    }}
                    enableReinitialize
                    onSubmit={submitDisplayedPaymentOptions}
                    render={(formik) => (
                        <div className="form">
                            <div className="row">
                                <FieldSelect formik={formik}
                                             id="displayedPaymentOptions"
                                             label="Displayed Payment Options"
                                             options={[
                                                 { value: '', text: 'Not selected' },
                                                 { value: 'CreditCardAndBankTransfer', text: 'Credit Card And Bank Transfer' },
                                                 { value: 'CreditCard', text: 'Credit Card' }
                                             ]}
                                />
                            </div>
                            <div className="row submit-holder">
                                <div className="field">
                                    <div className="inner">
                                        <button type="submit" className="button">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </section>
            <section>
                <h1>Availability Search Options</h1>
                <SearchOptionsForm
                    initialValues={availabilitySearchOptions}
                    onSubmit={submitAvailabilitySearchOptions}
                />
            </section>
            <AgentsList id={match.params.id} />
            <section>
                <Bookings
                    bookings={bookings}
                />
            </section>
        </div>
    );
}

export default AgencyPage;

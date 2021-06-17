import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import { price } from 'matsumoto/src/simple';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { CachedForm, FieldSelect } from 'matsumoto/src/components/form';
import Notifications from 'matsumoto/src/stores/notifications-store';

const AgencyBalance = ({ match }) => {
    const [agencyAccounts, setAgencyAccounts] = useState(null);
    const [displayedPaymentOptions, setDisplayedPaymentOptions] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.agenciesAccounts(match.params.id),
            success: (agencyAccounts) => setAgencyAccounts(agencyAccounts),
        });
        API.get({
            url: apiMethods.displayedPaymentOptions(match.params.id),
            success: (displayedPaymentOptions) => setDisplayedPaymentOptions(displayedPaymentOptions),
            error: setDisplayedPaymentOptions(false)
        });
    }, [])

    const submitDisplayedPaymentOptions = (values) => {
        API.put({
            url: apiMethods.displayedPaymentOptions(match.params.id),
            body: values.displayedPaymentOptions,
            success: () => Notifications.addNotification('Saved', null, 'success')
        });
    }

    return (
        <div className="page-content">
            <AgencyNavigation match={match}/>
            <section className="settings block">
                <section>
                    <h2>Balance: {price(agencyAccounts?.[0]?.balance.currency, agencyAccounts?.[0]?.balance.amount)}</h2>
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
            </section>
        </div>
    )
}

export default AgencyBalance;
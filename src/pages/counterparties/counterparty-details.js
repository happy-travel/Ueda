import React, { useState, useEffect } from 'react';
import { CachedForm, FieldSelect, FieldText } from 'matsumoto/src/components/form';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { PAYMENT_METHODS } from 'matsumoto/src/enum';
import CounterpartyNavigation from './counterparty-navigation';
import Notifications from 'matsumoto/src/stores/notifications-store';

const CounterpartyDetails = ({ match }) => {

    const [counterparty, setCounterparty] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(match.params.id),
            success: (counterparty) => {
                setCounterparty(counterparty)
            }
        });
    }, []);

    const submit = (body) => {
        API.put({
            url: apiMethods.counterparty(match.params.id),
            body,
            success: () => redirect(`/counterparties/${match.params.id}`),
            error: ({ errors }) => {
                Notifications.addNotification(errors.Name.toString(), null, 'warning');
            }
        });
    };

    const isPendingVerification = counterparty?.verificationState === 'PendingVerification';
    const isFullAccess = counterparty?.verificationState === 'FullAccess';
    return (
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
            <div className="admin-tab-element-wrapper block">
                <h2>Counterparty Information</h2>
                <CachedForm
                    initialValues={counterparty}
                    enableReinitialize
                    onSubmit={submit}
                    render={(formik) => (
                        <div className="form">
                            <div className="row wide">
                                <FieldText formik={formik} id="name" label="Name"
                                                            readOnly={!isPendingVerification}/>
                            </div>
                            <div className="row wide">
                                <FieldText formik={formik} id="address" label="Address"
                                                            readOnly={!isPendingVerification}/>
                            </div>
                            <div className="row-group">
                                <div className="row"><FieldText formik={formik} id="countryCode" label="Country Code"
                                                                readOnly={!isPendingVerification}/></div>
                                <div className="row"><FieldText formik={formik} id="city" label="City"
                                                                readOnly={!isPendingVerification}/></div>
                            </div>
                            <div className="row-group">
                                <div className="row"><FieldText formik={formik} id="phone" label="Phone"
                                                                readOnly={!isPendingVerification}/></div>
                                <div className="row"><FieldText formik={formik} id="fax" label="Fax"
                                                                readOnly={!isPendingVerification}/></div>
                            </div>
                            <div className="row-group">
                                <div className="row"><FieldText formik={formik} id="postalCode" label="Postal Code"
                                                                readOnly={!isPendingVerification}/></div>
                                <div className="row"><FieldText formik={formik} id="website" label="Website"
                                                                readOnly={!isPendingVerification}/></div>
                            </div>
                            <div className="row-group">
                                <div className="row">
                                    <FieldSelect formik={formik}
                                                 id="preferredPaymentMethod"
                                                 label="Preferred Payment Method"
                                                 readOnly={!isPendingVerification}
                                                 options={[
                                                     { value: PAYMENT_METHODS.ACCOUNT, text: 'Bank transfer' },
                                                     { value: PAYMENT_METHODS.CARD, text: 'Credit card' },
                                                     { value: PAYMENT_METHODS.OFFLINE, text: 'Offline' }
                                                 ]}
                                    />
                                </div>
                                <div className="row"><FieldText formik={formik} id="vatNumber" label="VAT Number"
                                                                readOnly={!isPendingVerification}/></div>
                            </div>
                            <div className="row wide">
                                <FieldText formik={formik} id="billingEmail" label="Billing Email"
                                                            readOnly={!isPendingVerification}/>
                            </div>
                            <div className="row submit-holder">
                                {!isFullAccess && <div className="field">
                                    <div className="inner">
                                        <button type="submit" className="button">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default CounterpartyDetails;


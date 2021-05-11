import React, { useState, useEffect } from 'react';
import { CachedForm, FieldSelect, FieldText } from 'matsumoto/src/components/form';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import { PAYMENT_METHODS } from 'matsumoto/src/enum';
import CounterpartyNavigation from './counterparty-navigation';

const CounterpartyDetails = ({ match }) => {

    let [counterparty, setCounterparty] = useState(null);

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
            success: () => redirect('/counterparties')
        });
    }

    return (
        <div>
            <CounterpartyNavigation match={match} />
            <section className="admin-tab-element-wrapper">
                <h2>Counterparty details</h2>
                <CachedForm
                    initialValues={counterparty}
                    enableReinitialize
                    onSubmit={submit}
                    render={(formik) => (
                        <div className="form">
                            <div className="row"><FieldText formik={formik} id="name" label="Name" /></div>
                            <div className="row"><FieldText formik={formik} id="address" label="Address" /></div>
                            <div className="row"><FieldText formik={formik} id="countryCode" label="Country Code" /></div>
                            <div className="row"><FieldText formik={formik} id="city" label="City" /></div>
                            <div className="row"><FieldText formik={formik} id="phone" label="Phone" /></div>
                            <div className="row"><FieldText formik={formik} id="fax" label="Fax" /></div>
                            <div className="row"><FieldText formik={formik} id="postalCode" label="Postal Code" /></div>
                            <div className="row">
                                <FieldSelect formik={formik}
                                             id="preferredPaymentMethod"
                                             label="Preferred Payment Method"
                                             options={[
                                                 { value: PAYMENT_METHODS.ACCOUNT, text: 'Bank transfer' },
                                                 { value: PAYMENT_METHODS.CARD, text: 'Credit card' },
                                                 { value: PAYMENT_METHODS.OFFLINE, text: 'Offline' }
                                             ]}
                                />
                            </div>
                            <div className="row"><FieldText formik={formik} id="website" label="Website" /></div>
                            <div className="row"><FieldText formik={formik} id="vatNumber" label="VAT Number" /></div>
                            <div className="row"><FieldText formik={formik} id="billingEmail" label="Billing Email" /></div>
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
        </div>
    )
}

export default CounterpartyDetails;
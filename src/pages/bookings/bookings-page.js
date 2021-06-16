import React from 'react';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';


const BookingsPage = () => {
    const submit = (values) => {
        API.get({
            url: apiMethods.bookingsByReferenceCode(values.refCode),
            success: () => {
                redirect(`/counterparties/agencies/booking/${values.refCode}`)
            },
        })
    }

    return (
        <div className="general-page-content-without-tabs">
            <section>
                <CachedForm
                    onSubmit={submit}
                    render={(formik) => (
                        <div className="form"
                             style={{
                                 width: '500px'
                             }}>
                            <div>
                                <div className="row">
                                    <FieldText formik={formik}
                                               id="refCode"
                                               label="Reference code"
                                    />
                                </div>
                            </div>
                            <button className="button"
                                    type="submit">
                                Go over
                            </button>
                        </div>
                    )}/>
            </section>
        </div>
    )
}

export default BookingsPage;


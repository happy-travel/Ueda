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
        <section style={{
            marginTop: '50px',
            width: '30%'
        }}>
           <CachedForm
           onSubmit={submit}
           render={(formik) => (
               <div className="form">
                   <div>
                       <div className="row">
                           <FieldText formik={formik}
                                      id="refCode"
                                      label="Reference code"
                                      />
                       </div>
                   </div>
                   <div className="button">
                       <button type="submit">
                           Go over
                       </button>
                   </div>
               </div>
           )}/>
        </section>
    )
}

export default BookingsPage;


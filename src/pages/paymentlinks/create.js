import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import { CachedForm, FieldText, FieldSelect, FieldTextarea } from 'matsumoto/src/components/form';
import apiMethods from 'core/methods';
import { copyToClipboard } from 'matsumoto/src/simple/logic';
import { ValidatorPaymentLink } from 'components/form/validation/validator-payment-link';

const CreatePaymentLinkPage = () => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         result: null
    //     }
    // }
    const [result, setResult] = useState(null);

    const submit = (values) => {
        API.post({
            url: values.send
                    ? apiMethods.createPaymentLinkAndSend
                    : apiMethods.createPaymentLink,
            body: {
                ...values,
                amount: parseFloat(values.amount)
            },
            success: (result = true) => setResult(result)
        });
    }

    const submitButtonClick = (event, send, formik) => {
        event.preventDefault();
        formik.setFieldValue('send', send);
        formik.handleSubmit();
    }


    if (this.state.result === true)
        return (
            <div className="block">
                <section>
                    <div>
                        <div className="form">
                            <h1>Successfully sent</h1>
                        </div>
                    </div>
                    <button className="button payment-back" onClick={() => setResult(null)}>
                        Create one more payment link
                    </button>
                </section>
            </div>
        );

    if (result)
        return (
            <div className="block">
                <section>
                    <div>
                        <div className="form">
                            <h1>Payment link generated</h1>
                            <br/>
                            <FieldText
                                readonly
                                value={result}
                            />
                        </div>
                        <br/>
                        <button className="button small" onClick={() => copyToClipboard(result)}>
                            Copy to Clipboard
                        </button>
                    </div>
                    <button className="button payment-back" onClick={() => setResult(null)}>
                        Create one more payment link
                    </button>
                </section>
            </div>
        );

    return (
        <div className="settings block">
            <section>
                <h1>Create a payment link</h1>
                <CachedForm
                    onSubmit={submit}
                    validationSchema={ValidatorPaymentLink}
                    render={(formik) => (
                        <div className="form">
                            <div className="row">
                                <FieldText formik={formik} id="amount" label="Amount" numeric required />
                            </div>
                            <div className="row">
                                <FieldText formik={formik} id="email" label="Email" required />
                            </div>
                            <div className="row">
                                <FieldSelect formik={formik}
                                             id="serviceType"
                                             label="Service Type"
                                             options={[
                                                 { value: 'HTL', text: 'HTL' },
                                                 { value: 'TRN', text: 'TRN' },
                                                 { value: 'CMS', text: 'CMS' }
                                             ]}
                                />
                            </div>
                            <div className="currency">
                                <FieldSelect formik={formik}
                                             id="currency"
                                             label="Currency"
                                             options={[
                                                 { value: 'USD', text: 'USD' },
                                                 { value: 'AED', text: 'AED' },
                                                 { value: 'SAR', text: 'SAR' }
                                             ]}
                                             required
                                />
                            </div>
                            <div className="row">
                                <FieldTextarea formik={formik}
                                               id="comment"
                                               label="Commentary"
                                               required
                                />
                            </div>
                            <div className="row submit-holder">
                                <div className="field">
                                    <div className="inner">
                                        <button
                                            onClick={(e) => submitButtonClick(e, false, formik)}
                                            className="button"
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="inner">
                                        <button
                                            onClick={(e) => submitButtonClick(e, true, formik)}
                                            className="button"
                                        >
                                            Send by Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </section>
        </div>
    );
}

export default CreatePaymentLinkPage;

import React from 'react';
import { CachedForm, FieldText, FieldSelect } from 'matsumoto/src/components/form';

class BalanceForm extends React.Component {
    render() {
        const { action } = this.props;
        return (
            <CachedForm
                onSubmit={action}
                initialValues={{
                    currency: 'USD'
                }}
                render={(formik) => (
                    <div className="form">
                        <div className="row"><FieldText formik={formik} id="amount" label="Amount" numeric /></div>
                        <div className="row"><FieldText formik={formik} id="reason" label="Reason" /></div>
                        <div className="row">
                            <FieldSelect formik={formik}
                                         id="currency"
                                         label="Currency"
                                         options={[
                                             { value: 'USD', text: 'USD' },
                                             { value: 'AED', text: 'AED' }
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
        );
    }
}

export default BalanceForm;

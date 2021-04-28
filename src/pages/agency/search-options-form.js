import React from 'react';
import { CachedForm, FieldSelect, FieldSwitch } from 'matsumoto/src/components/form';

class SearchOptionsForm extends React.Component {
    render() {
        const { initialValues, onSubmit } = this.props;
        return (
            <CachedForm
                initialValues={
                    initialValues || {
                        enabledSuppliers: {}
                    }
                }
                enableReinitialize
                onSubmit={onSubmit}
                render={(formik) => (
                    <div className="form">
                        <div className="row"><FieldSwitch formik={formik} id="isMarkupDisabled" label="Is Markup Disabled" /></div>
                        <div className="row"><FieldSwitch formik={formik} id="isSupplierVisible" label="Is Supplier Visible" /></div>
                        <div className="row">
                            <FieldSelect formik={formik}
                                         id="aprMode"
                                         label="APR Mode"
                                         options={[
                                             { value: '', text: 'None' },
                                             { value: 'Hide', text: 'Hide' },
                                             { value: 'DisplayOnly', text: 'Display Only' },
                                             { value: 'CardPurchasesOnly', text: 'Card Purchases Only' },
                                             { value: 'CardAndAccountPurchases', text: 'Card And Account Purchases' }
                                         ]}
                            />
                        </div>
                        <div className="row">
                            <FieldSelect formik={formik}
                                         id="passedDeadlineOffersMode"
                                         label="Passed Deadline Offers Mode"
                                         options={[
                                             { value: '', text: 'None' },
                                             { value: 'Hide', text: 'Hide' },
                                             { value: 'DisplayOnly', text: 'Display Only' },
                                             { value: 'CardPurchasesOnly', text: 'Card Purchases Only' },
                                             { value: 'CardAndAccountPurchases', text: 'Card And Account Purchases' }
                                         ]}
                            />
                        </div>
                        <div className="row">
                            <label>Enabled Suppliers</label>
                        </div>
                        <div className="row"><FieldSwitch formik={formik} id="enabledSuppliers.Unknown" label="Unknown" /></div>
                        <div className="row"><FieldSwitch formik={formik} id="enabledSuppliers.Netstorming" label="Netstorming" /></div>
                        <div className="row"><FieldSwitch formik={formik} id="enabledSuppliers.Illusions" label="Illusions" /></div>
                        <div className="row"><FieldSwitch formik={formik} id="enabledSuppliers.DirectContracts" label="DirectContracts" /></div>
                        <div className="row"><FieldSwitch formik={formik} id="enabledSuppliers.Etg" label="Etg" /></div>
                        <div className="row"><FieldSwitch formik={formik} id="enabledSuppliers.Rakuten" label="Rakuten" /></div>
                        <div className="row submit-holder">
                            <div className="field">
                                <div className="inner">
                                    <button type="submit" className="button">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            />
        )
    }
}

export default SearchOptionsForm;

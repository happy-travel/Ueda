import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import { CachedForm, FieldSelect, FieldSwitch } from 'matsumoto/src/components/form';
import apiMethods from 'core/methods';

@observer
class AgencyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedPaymentOptions: null,
            availabilitySearchOptions: null
        };
    }

    componentDidMount() {
        API.get({
            url: apiMethods.displayedPaymentOptions(this.props.match.params.id),
            success: (displayedPaymentOptions) => this.setState({ displayedPaymentOptions }),
            error: this.setState({ displayedPaymentOptions: false })
        })
        API.get({
            url: apiMethods.availabilitySearchOptions(this.props.match.params.id),
            success: (availabilitySearchOptions) => this.setState({
                availabilitySearchOptions: {
                    ...availabilitySearchOptions,
                    enabledSuppliers: availabilitySearchOptions
                        .enabledSuppliers
                        .reduce(( a, key ) => (a[key] = true, a), {})
                }
            }),
            error: this.setState({ availabilitySearchOptions: false })
        })
    }

    submitDisplayedPaymentOptions = (values) => {
        API.put({
            url: apiMethods.displayedPaymentOptions(this.props.match.params.id),
            body: values.displayedPaymentOptions,
            success: () => alert('Saved')
        });
    }

    submitAvailabilitySearchOptions = (values) => {
        API.put({
            url: apiMethods.availabilitySearchOptions(this.props.match.params.id),
            body: {
                values,
                enabledSuppliers: values
                    .enabledSuppliers
                    .keys()
                    .map((item) => values.enabledSuppliers[item] && item)
                    .filter((item) => item)
            },
            success: () => alert('Saved')
        });
    }

    activate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.activateAgency(this.props.match.params.id),
            body: { reason },
            success: () => alert('Agency activated')
        });
    }

    deactivate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.deactivateAgency(this.props.match.params.id),
            body: { reason },
            success: () => alert('Agency deactivated')
        });
    }

    render() {
        return (
            <div className="settings block">
                <section>
                    <h1>Agency #{this.props.match.params.id}</h1>

                    <div className="buttons">
                        <button className="button" onClick={this.activate}>Activate</button>
                        <button className="button" onClick={this.deactivate}>Deactivate</button>
                    </div>
                </section>
                <section>
                    <h1>Displayed Payment Options</h1>

                    <CachedForm
                        initialValues={{
                            displayedPaymentOptions: this.state.displayedPaymentOptions
                        }}
                        enableReinitialize
                        onSubmit={this.submitDisplayedPaymentOptions}
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

                    <CachedForm
                        initialValues={
                            this.state.availabilitySearchOptions || {
                                enabledSuppliers: {}
                            }
                        }
                        enableReinitialize
                        onSubmit={this.submitAvailabilitySearchOptions}
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
        );
    }
}

export default AgencyPage;

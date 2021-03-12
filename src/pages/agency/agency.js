import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import { CachedForm, FieldSelect } from 'matsumoto/src/components/form';
import apiMethods from 'core/methods';
import AgentsList from './agents';
import SearchOptionsForm from './search-options-form';
import Bookings from 'parts/bookings/bookings';
import AgencyBalance from './agency-balance';

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
        API.get({
            url: apiMethods.bookingsByAgency(this.props.match.params.id),
            success: (bookings) => {
                this.setState({
                    bookings
                });
            }
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
                    <SearchOptionsForm
                        initialValues={this.state.availabilitySearchOptions}
                        onSubmit={this.submitAvailabilitySearchOptions}
                    />
                </section>
                <section>
                    <h1>Balance</h1>
                    <AgencyBalance
                        id={this.props.match.params.id}
                    />
                </section>
                <AgentsList id={this.props.match.params.id} />
                <section>
                    <Bookings
                        bookings={this.state.bookings}
                    />
                </section>
            </div>
        );
    }
}

export default AgencyPage;

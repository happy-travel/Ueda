import React from 'react';
import { API } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import apiMethods from 'core/methods';
import SearchOptionsForm from './search-options-form';
import Bookings from 'parts/bookings/bookings';
import Notifications from 'matsumoto/src/stores/notifications-store';

class AgencyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agent: {},
            availabilitySearchOptions: null,
            bookings: []
        };
    }

    componentDidMount() {
        API.get({
            url: apiMethods.agencyAgents(this.props.match.params.id),
            success: (list) => {
                this.setState({
                    agent: list.filter(
                        (item) => item.agentId === Number(this.props.match.params.agentId)
                    )[0]
                });
            }
        })
        API.get({
            url: apiMethods.agentSettingsAvailabilitySearch(this.props.match.params.id, this.props.match.params.agentId),
            success: (availabilitySearchOptions) => {
                this.setState({
                    availabilitySearchOptions
                });
            }
        })
        API.get({
            url: apiMethods.bookingsByAgent(this.props.match.params.agentId),
            success: (bookings) => {
                this.setState({
                    bookings
                });
            }
        })
    }

    changeAgency = (values) => {
        API.post({
            url: apiMethods.agentChangeAgency(this.props.match.params.id, this.props.match.params.agentId),
            body: values.newAgencyId,
            success: () => Notifications.addNotification('Changed', null, 'success')
        })
    }

    submitAvailabilitySearchOptions = (values) => {
        API.put({
            url: apiMethods.agentSettingsAvailabilitySearch(this.props.match.params.id, this.props.match.params.agentId),
            body: {
                values,
                enabledSuppliers: values
                    .enabledSuppliers
                    .keys()
                    .map((item) => values.enabledSuppliers[item] && item)
                    .filter((item) => item)
            },
            success: () => Notifications.addNotification('Saved', null, 'success')
        });
    }

    render() {
        const { agent, availabilitySearchOptions } = this.state;

        return (
            <div className="settings block">
                <section>
                    <h1>Agent #{this.props.match.params.agentId} (Agency #{this.props.match.params.id})</h1>
                    <h3>Name: {agent.name}</h3>
                    <h3>Created: {date.format.a(agent.created * 1000)}</h3>
                    <h3>Markup: {agent.markupSettings}</h3>
                    <h3>{agent.isActive ? 'Active' : 'Inactive'}</h3>
                </section>
                <section>
                    <h1>Availability Search Options</h1>
                    <SearchOptionsForm
                        initialValues={availabilitySearchOptions}
                        onSubmit={this.submitAvailabilitySearchOptions}
                    />
                </section>
                <section>
                    <h1>Change Agency</h1>

                    <CachedForm
                        initialValues={{
                            displayedPaymentOptions: this.state.displayedPaymentOptions
                        }}
                        enableReinitialize
                        onSubmit={this.changeAgency}
                        render={(formik) => (
                            <div className="form">
                                <div className="row">
                                    <FieldText formik={formik}
                                               id="newAgencyId"
                                               label="New Agency ID"
                                               numeric
                                    />
                                </div>
                                <div className="row submit-holder">
                                    <div className="field">
                                        <div className="inner">
                                            <button type="submit" className="button">
                                                Change Agency
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </section>
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

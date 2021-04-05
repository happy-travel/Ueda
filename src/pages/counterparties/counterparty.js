import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import { Loader, price } from 'matsumoto/src/simple';
import { CachedForm, FieldText, FieldSelect } from 'matsumoto/src/components/form';
import apiMethods from 'core/methods';
import Table from 'matsumoto/src/components/table';
import Bookings from 'parts/bookings/bookings';
import CounterpartyBalance from './counterparty-balance';
import Breadcrumbs from 'matsumoto/src/components/breadcrumbs';
import { remapStatus } from 'matsumoto/src/simple';

@observer
class CounterpartyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counterparty: null,
            agencies: null,
            bookings: null,
            balance: null
        }
    }

    componentDidMount() {
        API.get({
            url: apiMethods.counterparty(this.props.match.params.id),
            success: (counterparty) => {
                this.setState({
                    counterparty
                });
            }
        });
        API.get({
            url: apiMethods.agencies(this.props.match.params.id),
            success: (agencies) => {
                this.setState({
                    agencies
                });
            }
        });
        API.get({
            url: apiMethods.bookingsByCounterparty(this.props.match.params.id),
            success: (bookings) => {
                this.setState({
                    bookings
                });
            }
        })
        API.get({
            url: apiMethods.accountBalance(this.props.match.params.id, 'USD'),
            success: (balance) => {
                this.setState({
                    balance
                });
            }
        })
    }

    submit = (body) => {
        API.put({
            url: apiMethods.counterparty(this.props.match.params.id),
            body,
            success: () => this.setState({ redirect: '/counterparties' })
        });
    }

    activate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.activateCounterparty(this.props.match.params.id),
            body: { reason },
            success: () => alert('Counterparty activated')
        });
    }

    deactivate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.deactivateCounterparty(this.props.match.params.id),
            body: { reason },
            success: () => alert('Counterparty deactivated')
        });
    }

    verify = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.verifyCounterparty(this.props.match.params.id),
            body: { reason },
            success: () => alert('Counterparty verified')
        });
    }

    verifyReadonly = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.verifyReadonlyCounterparty(this.props.match.params.id),
            body: { reason },
            success: () => alert('Counterparty verified readonly')
        });
    }

    downloadContract = () => {
        API.get({
            url: apiMethods.contractFile(this.props.match.params.id),
            response: (res) => {
                res.blob().then((blobby) => {
                    var anchor = document.createElement('a');
                    document.body.appendChild(anchor);

                    var objectUrl = window.URL.createObjectURL(blobby);
                    anchor.href = objectUrl;
                    anchor.download = 'contract.pdf';
                    anchor.click();

                    window.URL.revokeObjectURL(objectUrl);
                });
            }
        })
    }

    uploadContract = (e) => {
        e.preventDefault();
        API.put({
            url: apiMethods.contractFile(this.props.match.params.id),
            formDataBody: new FormData(document.getElementById('formElem')),
            success: () => this.setState({
                counterparty: {
                    ...this.state.counterparty,
                    isContractUploaded: true
                }
            })
        });
    }

    render() {
        if (this.state.redirect)
            return <Redirect push to={this.state.redirect}/>;

        if (!this.state.counterparty)
            return <Loader />;

        return (
            <div className="settings block">
                <section>
                    <Breadcrumbs
                        items={[
                            {
                                text: 'Сounterparties',
                                link: '/counterparties'
                            }, {
                                text: this.state.counterparty.name
                            }
                        ]}
                        backLink="/counterparties"
                    />
                    <h1>{this.state.counterparty.name}</h1>
                    <h3>Status: {this.state.counterparty.isActive ? 'Active' : 'Inactive'}</h3>
                    <h3 style={{ marginBottom: '30px' }}>State: {remapStatus(this.state.counterparty.verificationState)}</h3>

                    {/*
                        <div>Country Name: {this.state.counterparty.countryName}</div>
                        <div>Preferred Currency: {this.state.counterparty.preferredCurrency}</div>
                    */}

                    <div className="buttons">
                        {this.state.counterparty.isActive ?
                            <button className="button" onClick={this.deactivate}>Deactivate</button> :
                            <button className="button" onClick={this.activate}>Activate</button>}
                        <button className="button" onClick={this.verify}>Verify</button>
                        <button className="button" onClick={this.verifyReadonly}>Verify Readonly</button>
                    </div>

                    <h2>Balance: {price(this.state.balance)}</h2>
                    <CounterpartyBalance
                        id={this.props.match.params.id}
                    />

                    <h2>Contract {!this.state.counterparty.isContractUploaded && ' (No contract uploaded)'}</h2>
                    <div>
                        <div className="buttons voucher-image">
                            {this.state.counterparty.isContractUploaded &&
                                <button className="button" onClick={this.downloadContract}>Download Contract</button>
                            }

                            <div className="box">
                                <form id="formElem" onSubmit={this.uploadContract}>
                                    <label className="button file-upload">
                                        Upload Contract
                                        <input type="file" name="file" accept="image/*" onChange={this.uploadContract} />
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>

                    <h2>Agencies</h2>
                    <Table
                        list={this.state.agencies}
                        columns={ [
                            {
                                header: 'ID',
                                cell: 'id',
                            },
                            {
                                header: 'Name',
                                cell: 'name'
                            },
                        ]}
                        onRowClick={(item) => this.setState({
                            redirect: `/counterparties/agencies/${item.id}`
                        })}
                        textEmptyResult="No agencies"
                        textEmptyList="No agencies"
                    />

                    <h2>Counterparty details</h2>
                    <CachedForm
                        initialValues={this.state.counterparty}
                        enableReinitialize
                        onSubmit={this.submit}
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
                                                     { value: 'Other', text: 'Other' },
                                                     { value: 'BankTransfer', text: 'Bank transfer' },
                                                     { value: 'CreditCard', text: 'Credit card' },
                                                     { value: 'Offline', text: 'Offline' }
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
                <section>
                    <Bookings
                        bookings={this.state.bookings}
                    />
                </section>
            </div>
        );
    }
}

export default CounterpartyPage;

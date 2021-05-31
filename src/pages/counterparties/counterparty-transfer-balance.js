import React, { useState, useEffect } from 'react';
import { CachedForm, FieldSelect, FieldText } from 'matsumoto/src/components/form';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { price } from 'matsumoto/src/simple';
import CounterpartyBalance from './counterparty-balance';
import CounterpartyNavigation from './counterparty-navigation';

const CounterPartyTransferBalance = ({ match }) => {

    const [accounts, setAccounts] = useState(null);
    const [agencies, setAgencies] = useState(null);
    const [agency, setAgency] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterpartyAccountsList(match.params.id),
            success: (accounts) => {
                setAccounts(accounts);
            }
        });
        API.get({
            url: apiMethods.agencies(match.params.id),
            success: (agencies) => {
               setAgencies(agencies);
            }
        });
        API.get({
            url: apiMethods.accountBalance(match.params.id, 'USD'),
            success: (balance) => {
                setBalance(balance);
            }
        })
    }, [])

    const submitTransfer = (values) => {
        API.post({
            url: apiMethods.transferFromCounterpartyToAgency(values.counterpartyAccountId),
            body: values
        })
    }

    const getFormat = (accounts) => {
        return accounts?.map((item) => (
            {
                text: `Account #${item.id}: ${price(item.balance)}`,
                value: item.id
            }
        ));
    }

    const setAgenciesOptions = (agencies) => {
        return agencies?.map((item, index) => (
            {
                text: `Agency #${item.id}`,
                value: index
            }
        ));
    }

    const formChanged = (id) => {
        API.get({
            url: apiMethods.agency(agencies[id].id),
            success: (agency) => {
                setAgency(agency);
            }
        })
    }

    return (
        <>
            <CounterpartyNavigation match={match}/>
            <section className="block">
                {Boolean(balance) &&
                <>
                    <h2>Balance: {price(balance.currency, balance.balance)}</h2>
                    <CounterpartyBalance
                        id={accounts?.[0].id}
                    />
                </>
                }
                <div>
                    <h2>{'Transfer Balance'}</h2>
                    <CachedForm
                        onSubmit={submitTransfer}
                        render={(formik) => (
                            <div className="form" style={{ width: 400 }}>
                                <div className="row">
                                    <FieldSelect
                                        formik={formik}
                                        id="counterpartyAccountId"
                                        label="From Account"
                                        placeholder="Please Select"
                                        required
                                        options={getFormat(accounts)}
                                    />
                                </div>
                                <div className="row">
                                    <FieldSelect
                                        formik={formik}
                                        id="agency"
                                        label="To Agency"
                                        placeholder="Please Select"
                                        required
                                        setValue={formChanged}
                                        options={setAgenciesOptions(agencies)}
                                    />
                                </div>
                                <div className="row">
                                    <FieldSelect
                                        formik={formik}
                                        id="agencyAccount"
                                        label="To Agency Account"
                                        placeholder="Please Select"
                                        required
                                        options={getFormat(agency)}
                                    />
                                </div>
                                <div className="row">
                                    <FieldText
                                        formik={formik}
                                        id="amount"
                                        label="Amount"
                                        placeholder="Amount"
                                        numeric
                                    />
                                </div>
                                <div className="row">
                                    <FieldSelect
                                        formik={formik}
                                        id="currency"
                                        label="Currency"
                                        required
                                        options={[
                                            { value: 'USD', text: 'USD' },
                                            { value: 'EUR', text: 'EUR' },
                                            { value: 'AED', text: 'AED' },
                                            { value: 'SAR', text: 'SAR' }
                                        ]}
                                    />
                                </div>
                                <div className="row">
                                    <button type="submit" className="button" style={{ width: '100%' }}>
                                        Transfer
                                    </button>
                                </div>
                            </div>
                        )}/>
                </div>
            </section>
        </>
    )
}

export default CounterPartyTransferBalance;


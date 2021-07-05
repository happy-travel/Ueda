import React, { useState, useEffect } from 'react';
import { CachedForm, FieldSelect, FieldText } from 'matsumoto/src/components/form';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { price } from 'matsumoto/src/simple';
import CounterpartyBalance from './counterparty-balance';
import CounterpartyNavigation from './counterparty-navigation';
import CounterpartyTransferBalanceNavigation from './counterparty-transfer-balance-navigation';

const CounterpartyTransferBalanceInfo = ({ match }) => {

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
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
            <CounterpartyTransferBalanceNavigation
                match={match}
                accountId={accounts?.[0].id} />
            <div className="block">
                {Boolean(balance) &&
                <>
                    <h2>Balance: {price(balance.currency, balance.balance)}</h2>
                    <CounterpartyBalance
                        id={accounts?.[0].id}
                    />
                </>
                }
            </div>
        </div>
    )
}

export default CounterpartyTransferBalanceInfo;


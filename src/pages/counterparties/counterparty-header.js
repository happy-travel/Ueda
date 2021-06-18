import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import { price } from 'matsumoto/src/simple';
import CachedForm from 'matsumoto/src/components/form/cached-form';
import { FieldSwitch } from 'matsumoto/src/components/form';

const CounterpartyHeader = ({ id }) => {

    let [counterparty, setCounterparty] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(id),
            success: (counterparty) => {
                setCounterparty(counterparty)
            }
        });
        API.get({
            url: apiMethods.accountBalance(id, 'USD'),
            success: (balance) => {
                setBalance(balance);
            }
        });
    }, [])

    return (
        <div className="counterparty-header">
            <section>
                <h1>{counterparty?.name}</h1>
                {Boolean(balance) &&
                    <h4>
                        Balance: {price(balance.currency, balance.balance)}
                    </h4>
                }
                <CachedForm
                    render={(formik) => (
                        <div className="row">
                            <FieldSwitch
                                formik={formik}
                                value={counterparty?.isActive}/>
                        </div>
                    )}/>
            </section>
        </div>
    )
}

export default CounterpartyHeader;
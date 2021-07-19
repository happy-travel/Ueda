import React, { useState, useEffect } from 'react';
import CounterpartyNavigation from './counterparty-navigation';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const CounterpartyVerification = ({ match }) => {

    const [counterparty, setCounterparty] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(match.params.id),
            success: (counterparty) => {
                setCounterparty(counterparty)
            }
        });
    }, []);

    const verify = (contractKind) => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.verifyCounterparty(match.params.id),
            body: { contractKind, reason },
            success: () => Notifications.addNotification('Counterparty verified', null, 'success')
        });
    }

    const verifyReadonly = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.verifyReadonlyCounterparty(match.params.id),
            body: { reason },
            success: () => Notifications.addNotification('Counterparty verified readonly', null, 'success')
        });
    }

    return (
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
            <div className="buttons" style={{ marginBottom: '10px' }}>
                {counterparty?.verificationState !== 'FullAccess' &&
                <div className="verification-toolbar" style={{ margin: '10px 0 10px 0' }}>
                    <button className="button" onClick={verifyReadonly}>Verify Readonly</button>
                </div>}
                {counterparty?.verificationState === 'ReadOnly' &&
                <div className="verification-toolbar" style={{ margin: '10px 0 10px 0' }}>
                    <button className="button" onClick={() => verify('CashPayments')}>Verify Cash Payments</button>
                    <button className="button" onClick={() => verify('CreditPayments')}>Verify Virtual Account Payments
                    </button>
                    <button className="button" onClick={() => verify('CreditCardPayments')}>Verify Credit Card
                        Payments
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default CounterpartyVerification;
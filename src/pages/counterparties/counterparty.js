import React, { useState, useEffect } from 'react';
import CounterpartyNavigation from './counterparty-navigation';
import { remapStatus } from 'matsumoto/src/simple';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const CounterpartyPage = ({ match }) => {

    let [counterparty, setCounterparty] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(match.params.id),
            success: (counterparty) => {
                setCounterparty(counterparty)
            }
        });
    }, []);

    const activate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.activateCounterparty(match.params.id),
            body: { reason },
            success: () => Notifications.addNotification('Counterparty activated', null, 'success')
        });
    }

    const deactivate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.deactivateCounterparty(match.params.id),
            body: { reason },
            success: () => Notifications.addNotification('Counterparty deactivated', null, 'success')
        });
    }

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

    const downloadContract = () => {
        API.get({
            url: apiMethods.contractFile(match.params.id),
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

    const uploadContract = (e) => {
        e.preventDefault();
        API.put({
            url: apiMethods.contractFile(match.params.id),
            formDataBody: new FormData(document.getElementById('formElem')),
            success: () => setCounterparty({ ...this.state.counterparty,
                isContractUploaded: true })
        });
    }

    return (
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
            <div>
                <h1>{counterparty?.name}</h1>
                <h3>Balance</h3>
                <h3>Status: {counterparty?.isActive ? 'Active' : 'Inactive'}</h3>
                <h3 style={{ marginBottom: '30px' }}>State: {remapStatus(counterparty?.verificationState)}</h3>
                <div className="buttons" style={{ marginBottom: '10px' }}>
                    {counterparty?.isActive ?
                        <button className="button" onClick={deactivate}>Deactivate</button> :
                        <button className="button" onClick={activate}>Activate</button>}
                    {counterparty?.verificationState === 'ReadOnly' &&
                    <div className="verification-toolbar" style={{ margin: '10px 0 10px 0' }}>
                        <button className="button" onClick={() => verify('CashPayments')}>Verify Cash Payments</button>
                        <button className="button" onClick={() => verify('CreditPayments')}>Verify Virtual Account Payments
                        </button>
                        <button className="button" onClick={() => verify('CreditCardPayments')}>Verify Credit Card
                            Payments
                        </button>
                    </div>}
                    {counterparty?.verificationState !== "FullAccess" &&
                    <div className="verification-toolbar" style={{ margin: '10px 0 10px 0' }}>
                        <button className="button" onClick={verifyReadonly}>Verify Readonly</button>
                    </div>}
                </div>
                <div className="admin-tab-element-wrapper block">
                    <h2>Contract {!counterparty?.isContractUploaded && ' (No contract uploaded)'}</h2>
                    <div className="buttons voucher-image">
                        <div style={{ display: 'flex' }}>
                            {counterparty?.isContractUploaded &&
                            <button className="button" onClick={downloadContract}>
                                Download Contract
                            </button>}
                            <form id="formElem" onSubmit={uploadContract}>
                                <label className="button file-upload">
                                    {counterparty?.isContractUploaded ? 'Upload Another Contract' : 'Upload Contract'}
                                    <input type="file" name="file" accept="application/pdf"
                                           onChange={uploadContract}/>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CounterpartyPage;


import React from 'react';
import Modal from 'parts/modal';
import BalanceForm from './balance-form';
import { API } from 'matsumoto/src/core';
import Notifications from 'matsumoto/src/stores/notifications-store';

const BalanceModal = (props) => {
    const { onClose, text, method } = props;

    const action = (body) => {
        API.post({
            url: method,
            body,
            success: () => {
                Notifications.addNotification('Done', null, 'warning');
            },
            error: (error) => {
                Notifications.addNotification(JSON.stringify(error), null, 'warning');
            }
        });
        onClose();
    }


    return (
        <Modal
            onCloseClick={onClose}
            title={props.title}
        >
            <div className="modal-content">
                <span>{text}</span>
                <BalanceForm
                    action={action}
                />
            </div>
        </Modal>
    );
}

export default BalanceModal;

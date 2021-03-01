import React from 'react';
import Modal from 'parts/modal';
import BalanceForm from './balance-form';
import { API } from 'matsumoto/src/core';

const BalanceModal = (props) => {
    const { onClose, text, method } = props;

    const action = (body) => {
        API.post({
            url: method,
            body,
            success: () => {
                alert('Done!');
            },
            error: (error) => {
                alert(JSON.stringify(error));
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

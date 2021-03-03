import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

@observer
class Booking extends React.Component {
    bookingCancel = () => {
        API.post({
            url: apiMethods.bookingCancel(this.props.booking.id),
            success: () => alert('Cancelled')
        });
    }

    bookingDiscard = () => {
        API.post({
            url: apiMethods.bookingDiscard(this.props.booking.id),
            success: () => alert('Discarded')
        });
    }

    bookingPaymentCompleteManually = () => {
        API.post({
            url: apiMethods.paymentCompleteManually(this.props.booking.id),
            success: () => alert('Success'),
            error: (e) => alert(JSON.stringify(e))
        });
    }

    paymentConfirm = () => {
        API.post({
            url: apiMethods.paymentConfirm(this.props.booking.id),
            success: () => alert('Success'),
            error: (e) => alert(JSON.stringify(e))
        });
    }

    render() {
        return (
            <div className="block">
                <section>
                    <h1>Booking</h1>
                    <pre>{JSON.stringify(this.props.booking,1,2)}</pre>

                    <div className="buttons">
                        <button className="button" onClick={this.bookingCancel}>Cancel</button>
                        <button className="button" onClick={this.bookingDiscard}>Discard</button>
                        <button className="button" onClick={this.bookingPaymentCompleteManually}>Manually Complete Payment</button>
                        <button className="button" onClick={this.paymentConfirm}>Confirm Payment</button>
                    </div>
                    <div className="buttons">
                        <button className="button" onClick={this.props.onClose}>Back</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default Booking;

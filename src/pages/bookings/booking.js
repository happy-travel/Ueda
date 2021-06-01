import React from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import Breadcrumbs from 'matsumoto/src/components/breadcrumbs';
import BookingConfirmationView from './booking-confirmation-view';

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: null
        };
    }

    componentDidMount() {
        this.loadBooking();
    }

    loadBooking = async() => {
        const booking = await API.get({
            url: apiMethods.bookingsByReferenceCode(this.props.match.params.refCode),
        });
        this.setState({
            booking,
        });
    }
    bookingCancel = () => {
        API.post({
            url: apiMethods.bookingCancel(this.state.booking.bookingId),
            success: () => Notifications.addNotification('Cancelled', null, 'success')
        });
    }

    bookingDiscard = () => {
        API.post({
            url: apiMethods.bookingDiscard(this.state.booking.bookingId),
            success: () => Notifications.addNotification('Discarded', null, 'success')
        });
    }

    bookingPaymentCompleteManually = () => {
        API.post({
            url: apiMethods.paymentCompleteManually(this.state.booking.bookingId),
            success: () => Notifications.addNotification('Success', null, 'success'),
        });
    }

    paymentConfirm = () => {
        API.post({
            url: apiMethods.paymentConfirm(this.state.booking.bookingId),
            success: () => Notifications.addNotification('Success', null, 'success'),
        });
    }

    render() {
        const { booking } = this.state;
        return (
            <div className="confirmation block">
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '50px 0 30px' }}>
                        <div className="buttons">
                            <button className="button" onClick={this.bookingCancel}>Cancel</button>
                            <button className="button" onClick={this.bookingDiscard}>Discard</button>
                            <button className="button" onClick={this.bookingPaymentCompleteManually}>
                                Manually Complete Payment
                            </button>
                            <button className="button" onClick={this.paymentConfirm}>Confirm Payment</button>
                        </div>
                    </div>
                    <Breadcrumbs
                        backText="Back"
                    />
                    {booking && <BookingConfirmationView referenceCode={this.props.match.params.refCode} /> }
                </section>
            </div>
        );
    }
}

export default Booking;

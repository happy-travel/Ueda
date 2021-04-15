import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import BookingDetailsView from 'matsumoto/src/pages/accommodation/parts/booking-details-view';

@observer
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
            url: apiMethods.bookingsByReferenceCode(this.props.match.params.id),
        });
        this.setState({
            booking,
        });
    }
    bookingCancel = () => {
        API.post({
            url: apiMethods.bookingCancel(this.props.booking.id),
            success: () => Notifications.addNotification('Cancelled', null, 'success')
        });
    }

    bookingDiscard = () => {
        API.post({
            url: apiMethods.bookingDiscard(this.props.booking.id),
            success: () => Notifications.addNotification('Discarded', null, 'success')
        });
    }

    bookingPaymentCompleteManually = () => {
        API.post({
            url: apiMethods.paymentCompleteManually(this.props.booking.id),
            success: () => Notifications.addNotification('Success', null, 'success'),
            error: (e) => Notifications.addNotification(JSON.stringify(e), null, 'warning')
        });
    }

    paymentConfirm = () => {
        API.post({
            url: apiMethods.paymentConfirm(this.props.booking.id),
            success: () => Notifications.addNotification('Success', null, 'success'),
            error: (e) => Notifications.addNotification(JSON.stringify(e), null, 'warning')
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
                            <button className="button" onClick={this.bookingPaymentCompleteManually}>Manually Complete
                                Payment
                            </button>
                            <button className="button" onClick={this.paymentConfirm}>Confirm Payment</button>

                        </div>
                        <div className="buttons">
                            <button className="button" onClick={this.props.onClose}>Back</button>
                        </div>
                    </div>
                    {booking && <BookingDetailsView booking={booking}/>}
                </section>
            </div>
        );
    }
}

export default Booking;

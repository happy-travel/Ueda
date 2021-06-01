import React, { useEffect, useState } from 'react';
import { API } from 'matsumoto/src/core';
import { remapStatus } from 'matsumoto/src/simple/formatters/remap-status';
import { Dual, Loader } from 'matsumoto/src/components/simple';
import ViewFailed from 'matsumoto/src/parts/view-failed';
import BookingActionPart from 'matsumoto/src/pages/accommodation/parts/booking-actions';
import BookingDetailsView from 'matsumoto/src/pages/accommodation/parts/booking-details-view';
import BookingSummary from 'matsumoto/src/pages/accommodation/parts/booking-summary'
import apiMethods from 'core/methods';

const BookingConfirmationView = ({ referenceCode, PaymentInformation, bookingId }) => {
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(null);

    const loadBooking = async() => {
        const result = await API.get({
            url: apiMethods.bookingsByReferenceCode(referenceCode)
        });
        setBooking(result);
        setLoading(false);
    };

    useEffect(() => {
        loadBooking();
    }, []);


    if (!booking && loading)
        return <Loader />;

    if (!booking)
        return (
            <ViewFailed
                reason="Unable to load a booking confirmation"
                button="Back to Booking Management"
                link="/bookings"
            />
        );

    const details = booking.bookingDetails;

    return (
        <>
            { loading && <Loader page /> }

            <div className="billet-wrapper">
                <div className="billet">
                    <BookingSummary
                        details={booking.bookingDetails}
                        contract={booking}
                        checkInDate={details.checkInDate}
                        checkOutDate={details.checkOutDate}
                        agentReference={details.agentReference}
                    />
                    { booking.paymentStatus &&
                    <Dual
                        a="Payment Status"
                        b={<strong>{booking.paymentStatus.replace(/([A-Z])/g, ' $1')}</strong>}
                    />
                    }
                </div>
                <div className="another">
                    { PaymentInformation ? PaymentInformation : null }
                    <div className="accent-frame">
                        <div className="data">
                            <div className="first">
                                Booking Reference number<br />
                                <span className={'status ' + details.status}>{details.referenceCode}</span>
                            </div>
                            <div className="second">
                                Status<br/>
                                <strong className={'status ' + details.status}>{remapStatus(details.status)}</strong>
                            </div>
                        </div>
                    </div>
                    <BookingDetailsView booking={booking} />
                </div>
            </div>
        </>
    );
};

export default BookingConfirmationView;
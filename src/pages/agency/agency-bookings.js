import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import Bookings from 'parts/bookings/bookings';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

const AgencyBookings = ({ match }) => {
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.bookingsByAgency(match.params.id),
            success: (bookings) => {setBookings(bookings)}
        })
    },[])

    return (
        <>
            <AgencyNavigation match={match}/>
            <section>
                <Bookings
                    bookings={bookings}
                />
            </section>
        </>
    )
}

export default AgencyBookings;
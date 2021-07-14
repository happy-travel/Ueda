import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import Bookings from 'parts/bookings/bookings';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import AgencyHeader from './agency-header';

const AgencyBookings = ({ match }) => {
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.bookingsByAgency(match.params.id),
            success: (bookings) => {setBookings(bookings)}
        })
    },[])

    return (
        <div className="page-content">
            <AgencyHeader id={match.params.id}/>
            <AgencyNavigation match={match}/>
            <Bookings
                bookings={bookings}
            />
        </div>
    )
}

export default AgencyBookings;
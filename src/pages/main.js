import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInvite, forgetInvite } from 'matsumoto/src/tasks/signup/invitation';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const UedaMainPage = () => {

    useEffect(() => {
        const invitationCode = getInvite();
        if (invitationCode) {
            API.post({
                url: apiMethods.adminRegister,
                body: invitationCode,
                success: () => {
                    forgetInvite();
                    Notifications.addNotification('Registered', null, 'success');
                    redirect('/');
                },
                error: () => {
                    forgetInvite();
                    Notifications.addNotification('Unable to accept invitation', null, 'warning');
                }
            });
        }
    }, [])

    return (
        <div className="block">
            <section>
                <h1>Welcome</h1>
            </section>
        </div>
    );
}

export default UedaMainPage;

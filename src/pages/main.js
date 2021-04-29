import React from 'react';
import { Link } from 'react-router-dom';
import { getInvite, forgetInvite } from 'matsumoto/src/core/auth/invite';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

class UedaMainPage extends React.Component {
    componentDidMount() {
        const invitationCode = getInvite();
        if (invitationCode) {
            API.post({
                url: apiMethods.adminRegister,
                body: invitationCode,
                success: () => {
                    forgetInvite();
                    Notifications.addNotification('Registered', null, 'success');
                    this.setState({
                        redirect: '/'
                    });
                },
                error: () => {
                    forgetInvite();
                    Notifications.addNotification('Unable to accept invitation', null, 'warning');
                }
            });
        }
    }

    render() {
        return (
            <div className="block">
                <section>
                    <h1>Welcome</h1>
                    <div className="buttons">
                        <Link to="/counterparties">
                            <button className="button">
                                Counterparties
                            </button>
                        </Link>
                        <Link to="/paymentlinks">
                            <button className="button">
                                Payment Links
                            </button>
                        </Link>
                        <Link to="/admins">
                            <button className="button">
                                Admins
                            </button>
                        </Link>
                        <Link to="/duplicates">
                            <button className="button">
                                Duplicates
                            </button>
                        </Link>
                        <Link to="/globalmarkups">
                            <button className="button">
                                Markups
                            </button>
                        </Link>
                        <Link to="/reports">
                            <button className="button">
                                Reports
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}

export default UedaMainPage;

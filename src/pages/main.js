import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { getInvite, forgetInvite } from 'matsumoto/src/core/auth/invite';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

@observer
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
                error: (error) => {
                    forgetInvite();
                    Notifications.addNotification(JSON.stringify(error), null, 'warning');
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
                        {/* <Link to="/markups">
                            <button className="button">
                                Markups
                            </button>
                        </Link> */}
                    </div>
                </section>
            </div>
        );
    }
}

export default UedaMainPage;

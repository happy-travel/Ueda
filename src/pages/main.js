import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { getInvite, forgetInvite } from 'matsumoto/src/core/auth/invite';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

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
                    alert('Registered');
                    this.setState({
                        redirect: '/'
                    });
                },
                error: (error) => {
                    forgetInvite();
                    alert(JSON.stringify(error));
                    console.log(error);
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
                    </div>
                </section>
            </div>
        );
    }
}

export default UedaMainPage;

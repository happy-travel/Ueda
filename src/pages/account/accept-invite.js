import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

@observer
class AdminAcceptInvite extends React.Component {
    componentDidMount() {
        const invitation = this.props?.match?.params || {};
        API.post({
            url: apiMethods.adminRegister,
            rawBody: invitation.code,
            success: () => {
                alert('Registered');
                this.setState({
                    redirect: '/'
                });
            },
            error: (error) => {
                alert(JSON.stringify(error));
                console.log(error);
            }
        });
    }
    render() {
        if (this.state.redirect)
            return <Redirect push to={this.state.redirect}/>;

        return null;
    }
}

export default AdminAcceptInvite;
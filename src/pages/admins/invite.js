import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { Loader } from 'matsumoto/src/simple';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import FormUserData from 'matsumoto/src/parts/form-user-data';
import { registrationUserValidatorWithEmail } from 'matsumoto/src/components/form/validation';
import Notifications from 'matsumoto/src/stores/notifications-store';

@observer
class inviteAdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false
        };
    }

    submit = (body) => {
        this.setState({ success: null });
        API.post({
            url: apiMethods.adminSendInvitation,
            body,
            success: () => {
                this.setState({
                    success: true
                });
            },
        });
    }

    render() {
        return (
            <div className="settings block">
                <section>
                    <h2><span className="brand">Invite Administrator</span></h2>
                    { this.state.success === null && <Loader /> }
                    { this.state.success && <div>
                        {this.state.success === true &&
                            <div>
                                <h3>Your invitation sent</h3>
                            </div>
                        }
                    </div> }

                    { false === this.state.success && <CachedForm
                        validationSchema={registrationUserValidatorWithEmail}
                        onSubmit={this.submit}
                        render={(formik) => (
                            <React.Fragment>
                                <div className="form">
                                    <div className="row">
                                        <FieldText formik={formik}
                                                   id="email"
                                                   label="Email"
                                                   placeholder="Email"
                                                   required
                                        />
                                    </div>
                                    <FormUserData formik={formik} t={(x)=>x}/>
                                    <div className="row submit-holder">
                                        <div className="field">
                                            <div className="inner">
                                                <button className="button" onClick={formik.handleSubmit}>
                                                    Send Invitation
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    /> }
                </section>
            </div>
        );
    }
}

export default inviteAdminPage;

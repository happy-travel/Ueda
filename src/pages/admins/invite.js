import React, { useState } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { Loader } from 'matsumoto/src/components/simple';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import FormAgentData from 'matsumoto/src/parts/form-agent-data';
import { registrationAgentValidatorWithEmail } from 'matsumoto/src/components/form/validation';

const inviteAdminPage = () => {
    const [success, setSuccess] = useState(false);

    const submit = (body) => {
        setSuccess(null);
        API.post({
            url: apiMethods.adminSendInvitation,
            body,
            success: () => {setSuccess(true)},
        });
    }

    return (
        <div className="settings block">
            <section>
                <h2><span className="brand">Invite Administrator</span></h2>
                { success === null && <Loader /> }
                { success && <div>
                    {success === true &&
                        <div>
                            <h3>Your invitation sent</h3>
                        </div>
                    }
                </div> }

                { false === success && <CachedForm
                    validationSchema={registrationAgentValidatorWithEmail}
                    onSubmit={submit}
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
                                <FormAgentData formik={formik} t={(x)=>x}/>
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
                />}
            </section>
        </div>
    );
}

export default inviteAdminPage;

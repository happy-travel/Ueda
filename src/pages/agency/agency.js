import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

@observer
class AgencyPage extends React.Component {
    activate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.activateAgency(this.props.match.params.id),
            body: { reason },
            success: () => alert('Agency activated')
        });
    }

    deactivate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.deactivateAgency(this.props.match.params.id),
            body: { reason },
            success: () => alert('Agency deactivated')
        });
    }

    render() {
        return (
            <div className="block">
                <section>
                    <h1>Agency #{this.props.match.params.id}</h1>

                    <div className="buttons">
                        <button className="button" onClick={this.activate}>Activate</button>
                        <button className="button" onClick={this.deactivate}>Deactivate</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default AgencyPage;

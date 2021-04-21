import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import Verticaltable from '../vertical-table/vertical-table';

@observer
class DuplicatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duplicate: {}
        };
    }

    componentDidMount() {
        API.get({
            url: apiMethods.duplicate(this.props.match.params.id),
            success: (duplicate) => this.setState({ duplicate })
        })
    }

    approve = () => {
        API.post({
            url: apiMethods.duplicateApprove(this.props.match.params.id),
            success: () => Notifications.addNotification('Approved', null, 'success'),
        });
    }

    disapprove = () => {
        API.post({
            url: apiMethods.duplicateDisapprove(this.props.match.params.id),
            success: () => Notifications.addNotification('Disapproved', null, 'success'),
        });
    }

    render() {
        const { duplicate } = this.state;
        const a = duplicate.accommodations?.[0].data;
        const b = duplicate.accommodations?.[1].data;
        const columns = [
            {
                title: 'Name',
                selector: 'name',

            },
            {
                title: 'ID',
                selector: 'id',

            },
            {
                title: 'Emails',
                selector: 'contacts.emails',

            },
            {
                title: 'Phones',
                selector: 'contacts.phones',
                formatter: (row) => (row.contacts?.phones[0].replace(/-|\s/g,'')),


            },
            {
                title: 'Location',
                selector: 'location',
                formatter: (row) => (<div>
                    {row.location.country}<br/>
                    {row.location.address}
                </div>),

            },
            {
                title: 'Rating',
                selector: 'rating',

            },
            {
                title: 'Coordinates',
                selector: 'location',
                formatter: (row) => (<div>
                    {row.location?.coordinates?.longitude.toFixed(6)}<br/>
                    {row.location?.coordinates?.latitude.toFixed(6)}
                </div>),
                match: (a, b) => (a.location?.coordinates?.longitude.toFixed(4)===
                    b.location?.coordinates?.longitude.toFixed(4)),

            },
            {
                title: 'Photos',
                formatter: (row) => (<img 
                    style={{ width: '300px' }}
                    src={ row.photos[0].sourceUrl } alt={'No image'}/>),
                match: () => null,
            },
        ]

        return (
            <div className="settings block">
                <section>
                    <h1>Duplicate #{this.props.match.params.id}</h1>

                    <div className="buttons">
                        <button className="button" onClick={this.approve}>Approve</button>
                        <button className="button" onClick={this.disapprove}>Disapprove</button>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <strong>Created:</strong> {date.format.a(duplicate.created)}
                    </div>
                    <div>
                        <strong>Status:</strong> {duplicate.state}
                    </div>
                    { duplicate.agentName && <div>
                        <strong>Agent:</strong> {duplicate.agentName}
                    </div> }
                    {duplicate.accommodations &&
                                <Verticaltable dataA={a} dataB={b} columns={columns}/>
                    }
                </section>
            </div>
        );
    }
}

export default DuplicatePage;

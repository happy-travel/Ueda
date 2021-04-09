import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

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
                    <table>
                        <tr>
                            <th/>
                            <th>Accommodation A</th>
                            <th>Accommodation B</th>
                        </tr>
                        <tr>
                            <td><b>Source</b></td>
                            <td>{duplicate.accommodations[0].source}</td>
                            <td>{duplicate.accommodations[1].source}</td>
                        </tr>
                        {[
                            ['ID', (x) => x.id],
                            ['Name', (x) => x.name],
                            ['Location', (x) => x.location.countryCode + ' ' + x.location.address],
                            ['Coordinates', (x) => JSON.stringify(x.location.coordinates)],
                            ['Rating', (x) => x.rating],
                        ].map((line) => (
                            <tr>
                                <td><b>{line[0]}</b></td>
                                <td>{line[1](a)}</td>
                                <td>{line[1](b)}</td>
                            </tr>
                        ))}
                    </table>
                    }

                    <h1>Raw data</h1>
                    <h1>Accommodation A</h1>
                    <div>
                        <pre>
                            {JSON.stringify(a, 0, 2)}
                        </pre>
                    </div>
                    <h1>Accommodation B</h1>
                    <div>
                        <pre>
                            {JSON.stringify(b, 0, 2)}
                        </pre>
                    </div>

                </section>
            </div>
        );
    }
}

export default DuplicatePage;

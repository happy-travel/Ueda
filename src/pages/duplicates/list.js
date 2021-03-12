import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Table from 'matsumoto/src/components/table';
import { date } from 'matsumoto/src/simple';

@observer
class duplicatesListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }

    componentDidMount() {
        API.get({
            url: apiMethods.duplicates,
            success: (list) => {
                this.setState({
                    list
                });
            }
        });
    }

    render() {
        if (this.state.redirect)
            return <Redirect push to={this.state.redirect}/>;

        return (
            <div className="block">
                <section>
                    <h1>Duplicates list</h1>

                    <div style={{ marginTop: '-90px' }}>
                        <Table
                            list={this.state.list}
                            columns={ [
                                {
                                    header: 'ID',
                                    cell: 'id',
                                },
                                {
                                    header: 'Status',
                                    cell: 'state',
                                },
                                {
                                    header: 'Created',
                                    cell: (cell) => date.format.a(cell.created),
                                },
                                {
                                    header: 'Creator',
                                    cell: 'agentName',
                                },
                                {
                                    header: 'Accommodation A',
                                    cell: (cell) => cell.accommodations?.[0].supplier + ': ' + cell.accommodations?.[0].id
                                },
                                {
                                    header: 'Accommodation B',
                                    cell: (cell) => cell.accommodations?.[1].supplier + ': ' + cell.accommodations?.[1].id
                                },
                            ]}
                            onRowClick={(item) => this.setState({
                                redirect: `/duplicates/${item.id}`
                            })}
                            textEmptyResult="No duplicates reports found"
                            textEmptyList="No duplicates reports found (empty)"
                            searches={(v) => [
                                String(v.id), v.state, v.agentName, v.countryName,
                                v.accommodations?.[0].supplier,
                                v.accommodations?.[1].supplier,
                                v.accommodations?.[0].id,
                                v.accommodations?.[1].id,
                            ]}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default duplicatesListPage;

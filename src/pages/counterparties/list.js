import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Table from 'matsumoto/src/components/table';
import { remapStatus } from 'matsumoto/src/simple';

@observer
class CounterpartiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }

    componentDidMount() {
        API.get({
            url: apiMethods.counterparties,
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
                    <h1>Counterparties list</h1>

                    <div style={{ marginTop: '-90px' }}>
                        <Table
                            list={this.state.list}
                            columns={ [
                                {
                                    header: 'ID',
                                    cell: 'id',
                                },
                                {
                                    header: 'Name',
                                    cell: 'name'
                                },
                                {
                                    header: 'Address',
                                    cell: 'legalAddress'
                                },
                                {
                                    header: 'Contract',
                                    cell: (cell) => cell.isContractUploaded ? 'Uploaded' : '—'
                                },
                                {
                                    header: 'Status',
                                    cell: (cell) => remapStatus(cell.verificationState)
                                },
                                {
                                    header: 'State',
                                    cell: (cell) => cell.isActive ? 'Active' : 'Inactive'
                                }
                            ]}
                            onRowClick={(item) => this.setState({
                                redirect: `/counterparties/${item.id}`
                            })}
                            textEmptyResult="No counterparties found"
                            textEmptyList="No counterparties found (empty)"
                            searches={(v) => [String(v.id), v.name, v.city, v.countryName, v.address, v.verificationState]}
                        />
                    </div>
                    {this.state.result?.map((item) => (
                        <div key={item.id}>
                            <h3>#{item.id}: {item.name}</h3>
                            address: {item.address}
                        </div>
                    ))}
                </section>
            </div>
        );
    }
}

export default CounterpartiesList;

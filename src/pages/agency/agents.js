import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import Table from 'matsumoto/src/components/table';
import apiMethods from 'core/methods';

@observer
class AgentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }

    componentDidMount() {
        API.get({
            url: apiMethods.agencyAgents(this.props.id),
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
                    <h1>Agents list</h1>

                    <div style={{ marginTop: '-100px' }}>
                        <Table
                            list={this.state.list}
                            columns={ [
                                {
                                    header: 'ID',
                                    cell: 'agentId',
                                },
                                {
                                    header: 'Name',
                                    cell: 'name'
                                },
                                {
                                    header: 'Active',
                                    cell: (cell) => cell.isActive ? 'Yes' : 'No'
                                },
                                {
                                    header: 'Created',
                                    cell: (cell) => date.format.a(cell.created * 1000)
                                },
                                {
                                    header: 'Markup Settings',
                                    cell: 'markupSettings'
                                }
                            ]}
                            onRowClick={(item) => this.setState({
                                redirect: `/counterparties/agencies/${this.props.id}/agents/${item.agentId}`
                            })}
                            textEmptyResult="No agents found"
                            textEmptyList="No agents found (empty)"
                            searches={(v) => [String(v.agentId), v.name]}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default AgentsList;

import React, { useState, useEffect } from 'react';
import Table from 'matsumoto/src/components/table';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import CounterpartyNavigation from './counterparty-navigation';

const CounterpartyAgencies = ({ match }) => {

    const [agencies, setAgencies] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.agencies(match.params.id),
            success: (agencies) => {
                setAgencies(agencies);
            }
        });
    }, [])

    return (
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
            <section className="admin-tab-element-wrapper">
                <h2>Agencies</h2>
                <Table
                    list={agencies}
                    columns={[
                        {
                            header: 'ID',
                            cell: 'id',
                        },
                        {
                            header: 'Name',
                            cell: 'name'
                        },
                    ]}
                    onRowClick={(item) => redirect(`/counterparties/agencies/${item.id}`)}
                    textEmptyResult="No agencies"
                    textEmptyList="No agencies"
                />
            </section>
        </div>
    )
}

export default CounterpartyAgencies;


import React, { useState, useEffect } from 'react';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Table from 'matsumoto/src/components/table';
import { remapStatus } from 'matsumoto/src/simple';

const CounterpartiesList = () => {

    const [list, setList] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterparties,
            success: (list) => {
                setList(list)
            }
        });
    }, [])

    return (
        <div className="block counterparties-list">
            <section>
                <h1>Counterparties list</h1>

                <div style={{ marginTop: '-90px' }}>
                    <Table
                        list={list}
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
                            },
                            {
                                header: 'Markups',
                                cell: (cell) => cell.markupFormula || 'None'
                            }
                        ]}
                        onRowClick={(item) => redirect(`/counterparties/${item.id}`)}
                        textEmptyResult="No counterparties found"
                        textEmptyList="No counterparties found (empty)"
                        searches={(v) => [String(v.id), v.name, v.city, v.countryName, v.address, v.verificationState]}
                    />
                </div>
                {/*{this.state.result?.map((item) => (*/}
                {/*    <div key={item.id}>*/}
                {/*        <h3>#{item.id}: {item.name}</h3>*/}
                {/*        address: {item.address}*/}
                {/*    </div>*/}
                {/*))}*/}
            </section>
        </div>
    );
}

export default CounterpartiesList;

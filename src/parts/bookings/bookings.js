import React from 'react';
import { observer } from 'mobx-react';
import { date } from 'matsumoto/src/simple';
import Table from 'matsumoto/src/components/table';
import Booking from './booking';
import { Redirect } from 'react-router-dom';

@observer
class BookingsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: null,
            list: null
        }
    }

    render() {
        if (this.state.redirect)
            return <Redirect push to={ this.state.redirect }/>;
        const { bookings } = this.props;

        if (this.state.booking)
            return (
                <Booking
                    booking={this.state.booking}
                    onClose={() => this.setState({
                        booking: null
                    })}
                />
            );

        return (
            <div className="block">
                <h1>Bookings</h1>

                <div style={{ marginTop: '-100px' }}>
                    <Table
                        list={bookings}
                        columns={ [
                            {
                                header: 'ID',
                                cell: 'id',
                            },
                            {
                                header: 'Reference Code',
                                cell: 'referenceCode',
                            },
                            {
                                header: 'Status',
                                cell: 'status',
                            },
                            {
                                header: 'Payment Status',
                                cell: 'paymentStatus',
                            },
                            {
                                header: 'Agent ID',
                                cell: 'agentId',
                            },
                            {
                                header: 'Agency ID',
                                cell: 'agencyId',
                            },
                            {
                                header: 'Counterparty ID',
                                cell: 'counterpartyId',
                            },
                            {
                                header: 'Accommodation',
                                cell: (cell) => <>
                                    {cell.accommodationName}<br/>
                                    {cell.location.country}, {cell.location.locality}
                                </>
                            },
                            {
                                header: 'Created',
                                cell: (cell) => date.format.a(new Date(cell.created))
                            },
                            {
                                header: 'Total Price',
                                cell: 'totalPrice'
                            }
                        ]}
                        onRowClick={(item) => this.setState({
                            booking: item,
                            redirect: `booking/${item.referenceCode}`
                        })}
                        // onRowClick={()=> {
                        //     console.log(this.state, this.props)
                        // }}
                        textEmptyResult="No bookings found"
                        textEmptyList="No bookings found (empty)"
                        searches={(v) => [
                            String(v.agentId),
                            String(v.agencyId),
                            String(v.counterpartyId),
                            String(v.id),
                            String(v.htId),
                            String(v.referenceCode),
                            String(v.status),
                            String(v.paymentStatus),
                            String(v.paymentMethod),
                            String(v.supplier),
                            String(v.accommodationName)
                        ]}
                    />
                </div>
            </div>
        );
    }
}

export default BookingsList;

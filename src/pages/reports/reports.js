import React from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import FieldDatepicker from 'matsumoto/src/components/form/field-datepicker/field-datepicker';
import { FieldSelect } from 'matsumoto/src/components/form';
import { date } from 'matsumoto/src/simple';
import CachedForm from 'matsumoto/src/components/form/cached-form';



const urlMethods = {
    supplier: 'supplierConnectivityReport',
    agency: 'agencyConnectivityReport',
    agencyProductivity: 'agencyProductivityReport',
    fullBooking: 'fullBookingsReport'
}

const initialDateValues = {
    start: date.addMonth(new Date(), -1),
    end: new Date()
}

const reportResponse = (res, values) => {
    if (res.status === 400)
        Notifications.addNotification('Couldn\'t download a report');
    if (res.status === 200)
        res.blob().then((blobby) => {
            let anchor = document.createElement('a');
            document.body.appendChild(anchor);

            const objectUrl = window.URL.createObjectURL(blobby);
            anchor.href = objectUrl;
            anchor.download = `report${values.start.toISOString()}${values.end.toISOString()}.pdf`;
            anchor.click();

            window.URL.revokeObjectURL(objectUrl);
        });
}

const downloadReport = (values) => {
    API.get({
        url: apiMethods[values.reportMethod](values.start.toISOString(), values.end.toISOString()),
        response: (res) => reportResponse(res, values)
    })
}

const ReportsPage = () => (
    <div>
        <section>
            <CachedForm
                initialValues={initialDateValues}
                onSubmit={downloadReport}
                render={(formik) => (
                    <div className="form"
                         style={{
                             paddingTop: '120px',
                             width: '500px'
                         }}>
                        <div>
                            <h2>Download Report</h2>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingTop: '30px'
                             }}>
                            <div>
                                <div>
                                    <FieldDatepicker
                                    className="size-one"
                                    required
                                    formik={ formik }
                                    id="dates"
                                    first="start"
                                    second="end"
                                    label="Report Period"
                                    placeholder="Dates"
                                />
                                </div>
                                <div style={{
                                    paddingTop: '30px'
                                }}>
                                    <FieldSelect
                                    required
                                    formik={ formik }
                                    id="reportMethod"
                                    label="Report Data"
                                    placeholder="Please Select"
                                    options={[
                                        { value: urlMethods.supplier, text: 'Direct connectivity supplier wise report' },
                                        { value: urlMethods.agency, text: 'Direct connectivity agency wise report' },
                                        { value: urlMethods.agencyProductivity, text: 'Agencies productivity report' },
                                        { value: urlMethods.fullBooking, text: 'Full bookings report' }
                                    ]}
                                />
                                </div>
                            </div>
                            <div className="button"
                                 style={{
                                marginTop: '40px'
                            }}>
                                <button type="submit">
                                    Download Report
                                </button>
                            </div>
                        </div>
                    </div>
                )}/>
        </section>
    </div>
)

export default ReportsPage;

import React from 'react';
import ReportCard from './report-card';



const urlMethods = {
    supplier: 'supplierConnectivityReport',
    agency: 'agencyConnectivityReport',
    agencyProductivity: 'agencyProductivityReport',
    fullBooking: 'fullBookingsReport'
}

const ReportsPage = () => (
    <div className="page-content-no-tabs reports-list">
        <ReportCard>
            {urlMethods.supplier}
            <h3>Direct connectivity supplier wise report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.agency}
            <h3>Direct connectivity agency wise report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.agencyProductivity}
            <h3>Agencies productivity report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.fullBooking}
            <h3>Full bookings report</h3>
        </ReportCard>
        {/*<CachedForm*/}
        {/*    initialValues={initialDateValues}*/}
        {/*    onSubmit={downloadReport}*/}
        {/*    render={(formik) => (*/}
        {/*        <div className="form"*/}
        {/*             style={{*/}
        {/*                 width: '500px'*/}
        {/*             }}>*/}
        {/*            <div>*/}
        {/*                <h2>Download Report</h2>*/}
        {/*            </div>*/}
        {/*            <div style={{*/}
        {/*                display: 'flex',*/}
        {/*                flexDirection: 'column',*/}
        {/*                paddingTop: '30px'*/}
        {/*                 }}>*/}
        {/*                <div>*/}
        {/*                    <div>*/}
        {/*                        <FieldDatepicker*/}
        {/*                        className="size-one"*/}
        {/*                        required*/}
        {/*                        formik={ formik }*/}
        {/*                        id="dates"*/}
        {/*                        first="start"*/}
        {/*                        second="end"*/}
        {/*                        label="Report Period"*/}
        {/*                        placeholder="Dates"*/}
        {/*                    />*/}
        {/*                    </div>*/}
        {/*                    <div style={{*/}
        {/*                        paddingTop: '30px'*/}
        {/*                    }}>*/}
        {/*                        <FieldSelect*/}
        {/*                        required*/}
        {/*                        formik={ formik }*/}
        {/*                        id="reportMethod"*/}
        {/*                        label="Report Data"*/}
        {/*                        placeholder="Please Select"*/}
        {/*                        options={[*/}
        {/*                            { value: urlMethods.supplier, text: 'Direct connectivity supplier wise report' },*/}
        {/*                            { value: urlMethods.agency, text: 'Direct connectivity agency wise report' },*/}
        {/*                            { value: urlMethods.agencyProductivity, text: 'Agencies productivity report' },*/}
        {/*                            { value: urlMethods.fullBooking, text: 'Full bookings report' }*/}
        {/*                        ]}*/}
        {/*                    />*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*                    <button*/}
        {/*                        style={{ marginTop: '40px' }}*/}
        {/*                        className="button"*/}
        {/*                        type="submit">*/}
        {/*                        Download Report*/}
        {/*                    </button>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    )}/>*/}
    </div>
)

export default ReportsPage;

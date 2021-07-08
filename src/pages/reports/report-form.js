import React, { useRef } from 'react';
import DateDropdown from 'matsumoto/src/components/form/field-datepicker/dropdown-datepicker';
import { useDropdown } from 'matsumoto/src/simple';

const ReportForm = ({ formik, first, second }) => {

    const refElement = useRef(null);
    const refDropdown = useRef(null);
    let [dropdownOpen, toggleDropdown] = useDropdown(refElement, refDropdown);


    const setValue = ([from, to]) => {
        formik.setFieldValue(first, from);
        formik.setFieldValue(second, to);
        // if (onChange)
        //     onChange();
    };
    return (
        <DateDropdown
            formik={formik}
            connected={null}
            setValue={setValue}
            value={null}
            options={[
                new Date(formik.values[first]),
                new Date(formik.values[second])
            ]}
            focusIndex={null}
            close={() => toggleDropdown(false)}
        />
    )

}

export default ReportForm;
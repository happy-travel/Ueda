import React from 'react';
import { getIn } from 'formik';

const usualFormatter = (a, s) => (
    getIn(a, s));

const VerticalTableRow = ({
               accommodationA,
               accommodationB,
               selector,
               title,
               formatter = usualFormatter,
               match = (accommodationA, accommodationB) => accommodationA === accommodationB
}) => (
        <tr className={
            match(accommodationA,
                  accommodationB) ?
                'equal' :
                'different'
        }>
            <td>{title}</td>
            <td>{formatter(accommodationA, selector)}</td>
            <td>{formatter(accommodationB, selector)}</td>
        </tr>
    );



export default VerticalTableRow;

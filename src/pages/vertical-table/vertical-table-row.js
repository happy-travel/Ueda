import React from 'react';
import { getIn } from 'formik';

const usualFormatter = (a, s) => (
    getIn(a.data, s));

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
            <td className="title">{title}</td>
            <td>{formatter(accommodationA, selector)}</td>
            <td>{formatter(accommodationB, selector)}</td>
        </tr>
    );



export default VerticalTableRow;

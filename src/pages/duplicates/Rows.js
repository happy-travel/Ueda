import React from 'react';
import { getIn } from 'formik';

const Row = ({ accommodationA,accommodationB, selector, title, imgA, imgB }) => {
    return (
        <tr className={getIn(accommodationA, selector) ===
        getIn(accommodationB, selector) ? 'equal' : 'different'}>
            <td>{title}</td>
            {
                title === 'Photos' &&
                <>
                    <td>{imgA}</td>
                    <td>{imgB}</td>
                </>
            }
            {
                title !== 'Photos' &&
                <>
                    <td >{getIn(accommodationA, selector)}</td>
                    <td>{getIn(accommodationB, selector)}</td>
                </>
            }
        </tr>
    )

}

export default Row
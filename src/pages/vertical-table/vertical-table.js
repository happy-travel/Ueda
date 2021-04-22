import React, { useState, useEffect } from 'react';
import Row from './vertical-table-row';

const VerticalTable = ({ dataA, dataB, columns }) => {
    let [accommodationA, setAccommodationA] = useState(null);
    let [accommodationB, setAccommodationB] = useState(null);
    let [accommodationColumns, setAccommodationColumns] = useState(null);

    useEffect(() => {
        setAccommodationA(dataA);
        setAccommodationB(dataB);
        setAccommodationColumns(columns);
    })

    return(
        <div className="table vertical-table">
            {accommodationColumns &&
                <table className="the-table">
                    <tbody>
                        {accommodationColumns.map((el) => (
                            <Row accommodationA={ accommodationA }
                                 accommodationB={ accommodationB }
                                 selector={el.selector}
                                 sourceUrl={el.sourceUrl}
                                 title={el.title}
                                 formatter={el.formatter}
                                 match={el.match}
                            />
                                ))}
                    </tbody>
                </table>
                }
            </div>
        );

};

export default VerticalTable;

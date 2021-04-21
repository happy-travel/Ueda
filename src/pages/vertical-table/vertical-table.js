import React, { useState, useEffect } from 'react';
import Row from './vertical-table-row';

const VerticalTable = (props) => {
    let [dataA, setDataA] = useState(null);
    let [dataB, setDataB] = useState(null);
    let [columns, setColumns] = useState(null);

    useEffect(() => {
        setDataA(props.dataA);
        setDataB(props.dataB);
        setColumns(props.columns);
    })

    return(
            <div className="table">
                {columns &&
                        <table className="the-table">
                            <tbody>
                            {columns.map((el) => (
                                 <Row accommodationA={ dataA }
                                      accommodationB={ dataB }
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
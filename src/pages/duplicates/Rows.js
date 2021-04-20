import React from 'react';
import { getIn } from 'formik';
import { Stars } from 'matsumoto/src/simple/components/stars';

const Row = ({ accommodationA,accommodationB, selector, title }) => {
    const switchCase = () => {
        switch (selector) {
            case 'rating': return <div style={{ display: 'flex',
                justifyContent: 'space-around' }}>
                <td><Stars count={getIn(accommodationA, selector)}/></td>
                <td><Stars count={getIn(accommodationB, selector)}/></td>
            </div>

            case 'photos[0].sourceUrl' : return <tr>
                <td></td>
                <td>
                    <img width="300" src={getIn(accommodationA, selector)}/>
                </td>
                <td>
                    <img width="300" src={getIn(accommodationB, selector)}/>
                </td>
            </tr>

            case 'location.coordinates' : return <div style={{ display: 'flex',
                justifyContent: 'space-around' }}>
                <tr>
                    <td>{getIn(accommodationA, 'location.coordinates.latitude')}
                        <br/>{getIn(accommodationA, 'location.coordinates.longitude')}</td>
                    <td>{getIn(accommodationB, 'location.coordinates.latitude')}
                        <br/>{getIn(accommodationB, 'location.coordinates.longitude')}</td>
                </tr>
            </div>

            default: return <div
                className={getIn(accommodationA, selector) ===
                getIn(accommodationB, selector) ? 'equal' : null}
                style={{ display: 'flex',
                justifyContent: 'space-around' }}>
                <td>{getIn(accommodationA, selector)}</td>
                <td>{getIn(accommodationB, selector)}</td>
            </div>
        }
    }
    return (
        <tr>
            <td>{title}</td>
            {switchCase()}
            {/*{ selector === 'rating' ?*/}
            {/*    <div>*/}
            {/*        <td><Stars count={getIn(accommodationA, selector)}/></td>*/}
            {/*        <td><Stars count={getIn(accommodationB, selector)}/></td>*/}
            {/*    </div> :*/}
            {/*    <div>*/}
            {/*        <td>{getIn(accommodationA, selector)}</td>*/}
            {/*        <td>{getIn(accommodationB, selector)}</td>*/}
            {/*    </div>*/}
            {/*}*/}

        </tr>
    )

}

export default Row
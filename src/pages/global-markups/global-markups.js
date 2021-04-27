import React from 'react';
import apiMethods from '../../core/methods';
import Markups from 'matsumoto/src/parts/markups/markups';

const GlobalMarkups = () => {

    return(
        <div className="global-markups">
            <section style={{ marginTop: '150px' }}>
                <Markups
                id={null}
                emptyText={'No markups'}
                markupsRoute={() => apiMethods.markupGlobal}
                markupRoute={() => apiMethods.markupGlobal}
                />
            </section>
        </div>
    );

};

export default GlobalMarkups;

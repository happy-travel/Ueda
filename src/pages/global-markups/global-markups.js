import React from 'react';
import apiMethods from 'core/methods';
import Markups from 'matsumoto/src/parts/markups/markups';

const GlobalMarkups = () => (
    <div className="global-markups page-content-no-tabs"
    style={{
        marginTop: '35px',
        width: '50%'
    }}>
        <Markups
            id={null}
            emptyText={'No markups'}
            markupsRoute={apiMethods.markupsGlobal }
            markupRoute={apiMethods.markupGlobal }
        />
    </div>
);

export default GlobalMarkups;

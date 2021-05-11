import React from 'react';
import CounterpartyNavigation from './counterparty-navigation';
import Markups from 'matsumoto/src/parts/markups/markups';
import apiMethods from '../../core/methods';

const CounterPartyMarkupManager = ({ match }) => {
    return (
        <div>
            <CounterpartyNavigation match={match} />
                <section className="admin-tab-element-wrapper">
                    <Markups
                        id={ match.params.id }
                        emptyText={'No markups'}
                        markupsRoute={() => apiMethods.counterpartyMarkups(match.params.id)}
                        markupRoute={() => apiMethods.counterpartyMarkups(match.params.id)}
                    />
                </section>
        </div>
    )
}

export default CounterPartyMarkupManager;
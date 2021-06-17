import React from 'react';
import CounterpartyNavigation from './counterparty-navigation';
import Markups from 'matsumoto/src/parts/markups/markups';
import apiMethods from 'core/methods';

const CounterPartyMarkupManager = ({ match }) => (
    <div className="page-content">
        <CounterpartyNavigation match={match}/>
        <section>
            <Markups
                id={match.params.id}
                emptyText={'No markups'}
                markupsRoute={() => apiMethods.counterpartyMarkups(match.params.id)}
                markupRoute={() => apiMethods.counterpartyMarkups(match.params.id)}
            />
        </section>
    </div>
)

export default CounterPartyMarkupManager;


import React from 'react';
import CounterpartyNavigation from './counterparty-navigation';
import Markups from 'matsumoto/src/parts/markups/markups';
import apiMethods from 'core/methods';

const CounterPartyMarkupManager = ({ match }) => (
    <section>
        <CounterpartyNavigation match={ match } />
        <Markups
                id={ match.params.id }
                emptyText={'No markups'}
                markupsRoute={() => apiMethods.counterpartyMarkups(match.params.id)}
                markupRoute={() => apiMethods.counterpartyMarkups(match.params.id)}
            />
    </section>
)

export default CounterPartyMarkupManager;


import React, { useState } from 'react';
import BalanceModal from 'parts/balance-modal';
import apiMethods from 'core/methods';

const CounterpartyBalance = ({ id }) => {
    const [isIncreaseManuallyModalShown, showIncreaseManually] = useState(null);
    const [isDecreaseManuallyModalShown, showDecreaseManually] = useState(null);
    const [isReplenishModalShown, showReplenish] = useState(null);
    const [isSubtractModalShown, showSubtract] = useState(null);
    return (
        <div>
            <div className="buttons">
                <button
                    className="button"
                    onClick={() => showIncreaseManually(true)}
                >
                    Increase Manually
                </button>
                <button
                    className="button"
                    onClick={() => showDecreaseManually(true)}
                >
                    Decrease Manually
                </button>
                <button
                    className="button"
                    onClick={() => showReplenish(true)}
                >
                    Replenish
                </button>
                <button
                    className="button"
                    onClick={() => showSubtract(true)}
                >
                    Subtract
                </button>
            </div>

            {isReplenishModalShown ?
                <BalanceModal
                    title="Replenish counterparty account"
                    method={apiMethods.accountPlusMoney(id)}
                    onClose={() => showReplenish(false)}
                />
            : null}

            {isSubtractModalShown ?
                <BalanceModal
                    title="Subtract counterparty account"
                    method={apiMethods.accountMinusMoney(id)}
                    onClose={() => showSubtract(false)}
                />
            : null}

            {isIncreaseManuallyModalShown ?
                <BalanceModal
                    title="Increase Manually counterparty account"
                    method={apiMethods.accountManuallyPlusMoney(id)}
                    onClose={() => showIncreaseManually(false)}
                />
            : null}

            {isDecreaseManuallyModalShown ?
                <BalanceModal
                    title="Decrease Manually counterparty account"
                    method={apiMethods.accountManuallyMinusMoney(id)}
                    onClose={() => showDecreaseManually(false)}
                />
            : null}
        </div>
    )
}

export default CounterpartyBalance;
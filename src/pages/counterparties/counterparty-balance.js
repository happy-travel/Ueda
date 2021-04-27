import React from 'react';
import BalanceModal from 'parts/balance-modal';
import apiMethods from 'core/methods';

class CounterpartyBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isIncreaseManuallyModalShown: false,
            isDecreaseManuallyModalShown: false,
            isReplenishModalShown: false,
            isSubtractModalShown: false
        };
    }
    render() {
        return (
            <div>
                <div className="buttons">
                    <button
                        className="button"
                        onClick={() => this.setState({ isIncreaseManuallyModalShown: true })}
                    >
                        Increase Manually
                    </button>
                    <button
                        className="button"
                        onClick={() => this.setState({ isDecreaseManuallyModalShown: true })}
                    >
                        Decrease Manually
                    </button>
                    <button
                        className="button"
                        onClick={() => this.setState({ isReplenishModalShown: true })}
                    >
                        Replenish
                    </button>
                    <button
                        className="button"
                        onClick={() => this.setState({ isSubtractModalShown: true })}
                    >
                        Subtract
                    </button>
                </div>

                {this.state.isReplenishModalShown ?
                    <BalanceModal
                        title="Replenish counterparty account"
                        method={apiMethods.accountPlusMoney(this.props.id)}
                        onClose={() => this.setState({ isReplenishModalShown: false })}
                    />
                : null}

                {this.state.isSubtractModalShown ?
                    <BalanceModal
                        title="Subtract counterparty account"
                        method={apiMethods.accountMinusMoney(this.props.id)}
                        onClose={() => this.setState({ isSubtractModalShown: false })}
                    />
                : null}

                {this.state.isIncreaseManuallyModalShown ?
                    <BalanceModal
                        title="Increase Manually counterparty account"
                        method={apiMethods.accountManuallyPlusMoney(this.props.id)}
                        onClose={() => this.setState({ isIncreaseManuallyModalShown: false })}
                    />
                : null}

                {this.state.isDecreaseManuallyModalShown ?
                    <BalanceModal
                        title="Decrease Manually counterparty account"
                        method={apiMethods.accountManuallyMinusMoney(this.props.id)}
                        onClose={() => this.setState({ isDecreaseManuallyModalShown: false })}
                    />
                : null}
            </div>
        );
    }
}

export default CounterpartyBalance;
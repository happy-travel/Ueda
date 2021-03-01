import React from 'react';
import { observer } from 'mobx-react';
import BalanceModal from 'parts/balance-modal';
import apiMethods from 'core/methods';

@observer
class CounterpartyBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isIncreaseManuallyModalShown: false,
            isDecreaseManuallyModalShown: false,
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
                </div>

                {this.state.isIncreaseManuallyModalShown ?
                    <BalanceModal
                        title="Increase Manually agency account"
                        method={apiMethods.agencyAccountManuallyPlusMoney(this.props.id)}
                        onClose={() => this.setState({ isIncreaseManuallyModalShown: false })}
                    />
                : null}

                {this.state.isDecreaseManuallyModalShown ?
                    <BalanceModal
                        title="Decrease Manually agency account"
                        method={apiMethods.agencyAccountManuallyMinusMoney(this.props.id)}
                        onClose={() => this.setState({ isDecreaseManuallyModalShown: false })}
                    />
                : null}
            </div>
        );
    }
}

export default CounterpartyBalance;
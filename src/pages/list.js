import React from 'react';
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { API } from "core";
import METHODS from "core/methods";

@observer
class CounterpartiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result : null
        }
    }

    componentDidMount() {
        API.get({
            url: METHODS.COUNTERPARTIES,
            success: result => {
                console.log(result);
                this.setState({
                    result
                });
            }
        })
    }

    render () {
        var { t } = useTranslation();
        return (
            <div class="block">
                <section>
                    <h1>LIST</h1>
                    {this.state.result?.map(item => (
                        <div>
                            <h3>#{item.id}: {item.name}</h3>
                            address: {item.address}
                            {/*billingEmail: null
                            city: "radf"
                            countryCode: "TC"
                            countryName: "Turks and Caicos Islands"
                            fax: ""
                            phone: "49294923942"
                            postalCode: null
                            preferredCurrency: "NotSpecified"
                            preferredPaymentMethod: "Other"
                            vatNumber: null
                            website: ""*/}
                        </div>
                    ))}
                </section>
            </div>
        );
    }
}

export default CounterpartiesList;

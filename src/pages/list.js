import React from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

@observer
class CounterpartiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null
        }
    }

    componentDidMount() {
        API.get({
            url: apiMethods.getCounterparties,
            success: (result) => {
                this.setState({
                    result
                });
            }
        })
    }

    render() {
        return (
            <div className="block">
                <section>
                    <h1>LIST</h1>
                    {this.state.result?.map((item) => (
                        <div key={item.id}>
                            <h3>#{item.id}: {item.name}</h3>
                            address: {item.address}
                        </div>
                    ))}
                </section>
            </div>
        );
    }
}

export default CounterpartiesList;

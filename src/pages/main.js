import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@observer
class UedaMainPage extends React.Component {
    render() {
        return (
            <div className="block">
                <section>
                    <h1>Welcome</h1>
                    <div className="buttons">
                        <Link to="/counterparties">
                            <button className="button">
                                Counterparties
                            </button>
                        </Link>
                        <Link to="/paymentlinks">
                            <button className="button">
                                Payment Links
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}

export default UedaMainPage;

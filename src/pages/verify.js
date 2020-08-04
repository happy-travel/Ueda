import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

@observer
class VerifyPage extends React.Component {
    render() {
        // eslint-disable-next-line no-unused-vars
        var { t } = useTranslation();
        return (
            <div className="block">
                <section>
                    <h1>VERIFY</h1>
                    null
                </section>
            </div>
        );
    }
}

export default VerifyPage;

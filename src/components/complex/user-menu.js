import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import authStore from 'stores/auth-store';

const calcTitleFor = (value) => (value?.length > 14 ? { title: value } : {});

@observer
class UserMenu extends React.Component {
    render() {
        const { t } = useTranslation();

        var userName = (authStore.user?.firstName || '') + ' ' + (authStore.user?.lastName || '');
        return (
            <>
                <Link to="/logout" className="button transparent-with-border">
                    Logout
                </Link>
                <div className="switcher user-switcher">
                    <div className="avatar" />
                    <div className="double">
                        <div
                            className="name"
                            {...calcTitleFor(userName)}
                        >
                            <span>
                                {userName}
                            </span>
                        </div>
                        <div
                            className="company"
                            {...calcTitleFor(authStore.activeCounterparty.name)}
                        >
                            {authStore.activeCounterparty.name}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UserMenu;

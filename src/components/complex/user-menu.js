import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@observer
class UserMenu extends React.Component {
    render() {
        return (
            <div className="user-menu">
                <Link to="/logout" className="button">
                    Logout
                </Link>
            </div>
        );
    }
}

export default UserMenu;

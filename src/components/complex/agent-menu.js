import React from 'react';
import { Link } from 'react-router-dom';

class AgentMenu extends React.Component {
    render() {
        return (
            <div className="agent-menu">
                <Link to="/logout" className="button">
                    Logout
                </Link>
            </div>
        );
    }
}

export default AgentMenu;

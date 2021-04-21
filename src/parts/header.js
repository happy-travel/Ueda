import React from 'react';
import { Link } from 'react-router-dom';
import AgentMenu from 'components/complex/agent-menu';
import { Authorized } from 'matsumoto/src/core/auth';

const Header = () => {
    return (
        <header>
            <section>
                <div className="logo-wrapper">
                    <div className="logo">
                        <Link to="/" className="image" />
                        <div className="underline" />
                    </div>
                </div>
                { Authorized() && <AgentMenu /> }
            </section>
        </header>
    );
};

export default Header;

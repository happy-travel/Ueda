import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from 'matsumoto/src/components/complex/user-menu';
import { Authorized } from 'matsumoto/src/core/auth';

const Header = () => {
    return (
        <header>
            <section>
                <div className="logo-wrapper">
                    <Link to="/" class="logo" />
                </div>
                <nav>
                </nav>
                { Authorized() && <UserMenu /> }
            </section>
        </header>
    );
};

export default Header;

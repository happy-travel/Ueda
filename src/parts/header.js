import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserMenu from 'components/complex/user-menu';
import { Authorized } from 'matsumoto/src/core/auth';

const Header = () => {
    return (
        <header>
            <section>
                <div className="logo-wrapper">
                    <Link to="/" class="logo" />
                </div>
                <div className="search-wrapper">

                </div>
                { Authorized() && <UserMenu /> }
            </section>
        </header>
    );
};

export default Header;

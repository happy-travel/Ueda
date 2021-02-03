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
                <nav>
                    <li><NavLink to="/counterparties">Counterparties</NavLink></li>
                    <li><NavLink to="/paymentlinks">Payment Links</NavLink></li>
                    <li><NavLink to="/admins">Admins</NavLink></li>
                    <li><NavLink to="/duplicates">Duplicates</NavLink></li>
                </nav>
                { Authorized() && <UserMenu /> }
            </section>
        </header>
    );
};

export default Header;

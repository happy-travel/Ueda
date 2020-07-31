import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import UserMenu from "components/complex/user-menu";

import { Authorized } from "core/auth";

const Header = () => {
    const { t } = useTranslation();

    return (
        <header>
            <section>
                <div class="logo-wrapper">
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

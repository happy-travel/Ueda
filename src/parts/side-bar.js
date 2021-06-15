import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <nav className="side-bar" style={{
            width: '329px',
            height: '1348px',
            position: 'absolute'
        }}>
            <div style={{
                paddingTop: '130px'
            }}>
                <Link to="/counterparties">
                    <div className="sidebar-item">
                        <i className="icon icon-counterparty sidebar-item" />
                        <span>Counterparties</span>
                    </div>
                </Link>
                <Link to="/paymentlinks">
                    <div className="sidebar-item">
                        <i className="icon icon-payment-links sidebar-item" />
                        <span>Payment Links</span>
                    </div>
                </Link>
                <Link to="/admins">
                    <div className="sidebar-item">
                        <i className="icon icon-admins sidebar-item" />
                        <span>Admins</span>
                    </div>
                </Link>
                <Link to="/duplicates">
                    <div className="sidebar-item">
                        <i className="icon icon-duplicates sidebar-item" />
                        <span>Duplicates</span>
                    </div>
                </Link>
                <Link to="/globalmarkups">
                    <div className="sidebar-item">
                        <i className="icon icon-markups sidebar-item" />
                        <span>Markups</span>
                    </div>
                </Link>
                <Link to="/reports">
                    <div className="sidebar-item">
                        <i className="icon icon-reports sidebar-item" />
                        <span>Reports</span>
                    </div>
                </Link>
                <Link to="/bookings">
                    <div className="sidebar-item">
                        <i className="icon icon-bookings sidebar-item" />
                        <span>Bookings</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default SideBar;
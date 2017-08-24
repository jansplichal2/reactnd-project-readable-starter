import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header clearfix">
            <nav>
                <ul className="nav nav-pills float-right">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <h3 className="text-muted">Udemy Readable</h3>
        </div>
    );
};

export default Header;
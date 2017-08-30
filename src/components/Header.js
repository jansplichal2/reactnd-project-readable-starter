import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className="row">
            <div className="col-12 my-4">
                <nav>
                    <ul className="nav nav-pills float-right">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
                <h3 className="text-muted">Udemy Readable</h3>
            </div>
        </div>
    );
};

export default Header;
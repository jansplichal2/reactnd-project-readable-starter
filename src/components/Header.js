import React from 'react';
import PropTypes from 'prop-types';

const Header = ( { page } ) => {
    return (
        <div className="header clearfix">
            <nav>
                <ul className="nav nav-pills float-right">
                    <li className="nav-item">
                        <a className={page !== 'Home' ? 'nav-link active' : 'nav-link'} href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                </ul>
            </nav>
            <h3 className="text-muted">Udemy Readable</h3>
        </div>
    );
};

Header.propTypes = {
    page: PropTypes.string.isRequired
};

export default Header;
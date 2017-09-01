import React from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const ObjectNotFound = ({name}) => {

    return (<div>

            <div className="container">
                <div className="row">
                    <div className="ml-auto mb-4 col-8">
                        <h1><i className="fa fa-frown-o red"/> {_.capitalize(name) || 'Page'} not found (404)</h1>
                        <p>We couldn't find the {name || 'page'} what you're looking for on.</p>
                        <p><Link to="/" className="btn btn-outline-success btn-lg">Go to homepage</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ObjectNotFound;
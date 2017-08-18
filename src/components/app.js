import React, { Component } from 'react';
import {Route} from 'react-router-dom';


class Readable extends Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div>
                        Page 1
                    </div>
                )}/>
                <Route exact path="/search" render={() => (
                    <div>
                        Page 2
                    </div>
                )}/>
            </div>
        )
    }
}

export default Readable;
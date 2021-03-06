import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllCategories} from '../actions/categories';
import _ from 'lodash';

class CategoriesList extends Component {

    componentDidMount() {
        this.props.fetchAllCategories();
    }

    render() {
        const {categories} = this.props;

        return (
            <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                    Categories
                </li>
                {_.map(categories, category => (
                    <li className="list-group-item" key={category.path}>
                        <Link to={category.path}>{category.name}</Link>
                    </li>)
                )}
            </ul>
        );

    }
}

const mapStateToProps = ({categories}) => ({
    categories
});

export default connect(mapStateToProps, {fetchAllCategories})(CategoriesList);
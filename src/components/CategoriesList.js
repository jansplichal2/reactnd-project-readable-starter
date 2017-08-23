import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllCategories} from '../actions/categories';

class CategoriesList extends Component {

    componentDidMount() {
        this.props.load();
    }

    render() {
        const {categories} = this.props;

        return (
            <div className="row">
                <div className="col-3">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-dark">
                            Categories
                        </li>
                        {categories.map(category => (
                            <li className="list-group-item" key={category.path}>
                                <a href="#">{category.name}</a>
                            </li>)
                        )}
                    </ul>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state, props) => ({
    categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(fetchAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
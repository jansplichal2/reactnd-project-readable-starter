import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../actions/categories';

class CategoriesList extends Component{

    componentDidMount(){
        this.props.load();
    }

    render(){
        const { categories } = this.props;

        return(
          <ul>
              {categories.map(category => (<li key={category.path}>{category.name}</li>))}
          </ul>
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
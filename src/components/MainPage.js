import React, {Component} from 'react';
import CategoriesList from './CategoriesList';
import PostTable from './PostTable';
import {Link, withRouter} from 'react-router-dom';

class MainPage extends Component {
    componentWillMount() {
        this.category = this.props.match.params['category'];
        this.isCategoryUsed = !!this.category;
    }

    renderCategories() {
        if (this.isCategoryUsed) {
            return (
                <h5 className="col-12">Filter by: {this.category}</h5>
            );
        } else {
            return (<div className="col-12 col-md-3 col-lg-2 mb-3">
                <CategoriesList/>
            </div>);
        }
    }

    renderButtonPositioning() {
        let styles = 'col-12 my-4';
        styles += this.isCategoryUsed ? ' mb-2' : ' col-md-9 col-lg-10 ml-auto';
        return styles;
    }

    renderTablePositioning() {
        return `col-12 ${this.isCategoryUsed ? '' : 'col-md-9 col-lg-10'}`;
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.renderCategories()}
                    <div className={this.renderTablePositioning()}>
                        <PostTable category={this.category}/>
                    </div>
                    <div className={this.renderButtonPositioning()}>
                        <Link className="btn btn-lg btn-outline-primary" to="/posts/new">New Post</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MainPage);
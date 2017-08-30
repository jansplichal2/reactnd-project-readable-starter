import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {renderField, renderTextarea} from '../util/forms';
import {createPost, editPost, fetchPost} from '../actions/posts';
import {fetchAllCategories} from '../actions/categories';
import _ from 'lodash';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(values) {
        if (this.isNewPost) {
            this.props.createPost(values).then(data => {
                const {category, id} = data.post;
                this.props.history.push(`/${category}/${id}`);
            });
        } else {
            this.props.editPost(values).then(data => {
                const {category, id} = data.post;
                this.props.history.push(`/${category}/${id}`);
            });
        }

    }

    componentDidMount() {
        const postId = this.props.match.params['post_id'];

        if (postId) {
            this.isNewPost = false;
            this.props.fetchPost(postId);
        } else {
            this.isNewPost = true;
        }

        this.postTitle.focus();
        this.props.fetchAllCategories();
    }

    render() {
        const {
            categories, handleSubmit,
            submitting
        } = this.props;

        return (
            <div className="row">
                <div className="col-12 col-md-6">
                    <form className="mt-3 mb-4" onSubmit={handleSubmit(this.submitForm)}>

                        <Field inputRef={el => this.postTitle = el} name="title" label="Title" component={renderField}
                               type="text"/>
                        <Field name="body" label="Body" component={renderTextarea} rows="5"/>

                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <Field name="category" className="form-control" component="select">
                                {_.map(categories, category => (
                                    <option key={category.path} value={category.name}>
                                        {category.name}
                                    </option>)
                                )}
                            </Field>
                        </div>
                        <button type="submit" disabled={submitting} className="btn btn-lg btn-outline-primary">
                            {this.isNewPost ? 'Add Post' : 'Edit Post'}
                        </button>
                        <Link to="/"
                              className="ml-2 btn btn-lg btn-outline-danger">Cancel
                        </Link>
                    </form>
                </div>
            </div>
        );
    }

}

const validate = values => {
    //console.log(values);
    const errors = {};

    if (!values.title) {
        errors.title = "Title is required";
    }

    if (!values.body) {
        errors.body = "Body is required";
    }

    return errors;
};

const mapStateToProps = (state, props) => {
    const postId = props.match.params['post_id'];
    const initialValues = postId ? state.posts[postId] : {category: 'react'};

    return {
        categories: state.categories,
        initialValues: initialValues,
    }
};

const formWithRedux = reduxForm({form: 'PostForm', validate})(PostForm);

export default connect(mapStateToProps, {createPost, editPost, fetchPost, fetchAllCategories})(formWithRedux);

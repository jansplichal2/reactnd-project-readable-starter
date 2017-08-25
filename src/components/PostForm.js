import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {renderField, renderTextarea} from '../util/forms';
import {createPost} from '../actions/posts';
import _ from 'lodash';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(values) {
        this.props.createPost(values).then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        const {
            categories, handleSubmit,
            submitting
        } = this.props;

        return (
            <div className="row">
                <div className="col-6">
                    <form className="mt-3 mb-4" onSubmit={handleSubmit(this.submitForm)}>

                        <Field name="title" label="Title" component={renderField} type="text"/>
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
                        <button type="submit" disabled={submitting} className="btn btn-lg btn-outline-primary">Add
                            Post
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
        errors.body = "Body is requires";
    }

    return errors;
};

const mapStateToProps = (state) => ({
    categories: state.categories
});

const formWithRedux = reduxForm({form: 'PostForm', validate, initialValues: {category: 'react'}})(PostForm);

export default connect(mapStateToProps, {createPost})
(formWithRedux);

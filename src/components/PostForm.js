import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';

const styling = (touched, error) => {
    let style = 'form-control ';
    if(touched && error){
        style += 'is-invalid';
    } else if(touched){
        style += 'is-valid';
    }
    return style;
};


const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error}
                     }) => {
    const showError = touched && error;
    const cls = styling(touched, error);

    return (
        <div className="form-group">
            <label>
                {label}
            </label>
            <input {...input} className={cls} placeholder={label} type={type}/>
            {showError &&
            <div className="invalid-feedback">
                {error}
            </div>}
        </div>);
};

const renderTextarea = ({
                            input,
                            label,
                            rows,
                            meta: {touched, error}
                        }) => {
    const showError = touched && error;
    const cls = styling(touched, error);

    return (<div className="form-group">
        <label>
            {label}
        </label>
        <textarea {...input} className={cls} rows={rows}/>
        {showError &&
            <div className="invalid-feedback">
                {error}
            </div>}
    </div>);
}

class PostForm extends Component {
    state = {
        title: '',
        body: '',
        category: ''
    };

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(values) {
        console.log(values);
    }

    render() {
        const {
            categories, handleSubmit,
            pristine, reset, submitting
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
                                {categories.map(category => (
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

const formWithRedux = reduxForm({form: 'PostForm', validate})(PostForm);

export default connect(mapStateToProps)
(formWithRedux);

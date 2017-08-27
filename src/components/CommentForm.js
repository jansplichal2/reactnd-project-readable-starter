import React, {Component} from 'react';
import {createComment} from '../actions/comments';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {renderTextarea} from '../util/forms';

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(values) {
        const {post_id, category} = this.props.match.params;

        this.props.createComment({...values, parent:post_id})
            .then((comment) => this.props.history.push(`/${category}/${post_id}`));
    }

    componentDidMount(){
        this.commentBody.focus();
    }

    render() {
        const {
            handleSubmit,
            submitting,
            match
        } = this.props;

        const {post_id, category} = match.params;

        return (
            <div className="row">
                <div className="col-12 col-md-6">
                    <form className="mt-3 mb-4" onSubmit={handleSubmit(this.submitForm)}>

                        <Field inputRef={el => this.commentBody = el} name="body" label="Comment" component={renderTextarea} rows="5"/>
                        <button type="submit" disabled={submitting} className="btn btn-lg btn-outline-primary">Add
                            Comment
                        </button>
                        <Link to={`/${category}/${post_id}`}
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

    if (!values.body) {
        errors.body = "Body is required";
    }

    return errors;
};


const formWithRedux = reduxForm({form: 'CommentForm', validate})(CommentForm);

export default connect(null, {createComment})(formWithRedux);

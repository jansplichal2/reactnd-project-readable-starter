import React, {Component} from 'react';
import {createComment, fetchComment, editComment} from '../actions/comments';
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
        const {category} = this.props.match.params;
        const {parentId} = this.props;

        if (this.isNewComment) {
            this.props.createComment({...values, parent: parentId})
                .then((comment) => this.props.history.push(`/${category}/${parentId}`));
        } else {
            this.props.editComment(values)
                .then((comment) => this.props.history.push(`/${category}/${parentId}`));
        }
    }

    componentDidMount() {
        const commentId = this.props.match.params['comment_id'];

        if (commentId) {
            this.isNewComment = false;
            this.props.fetchComment(commentId);
        } else {
            this.isNewComment = true;
        }

        this.commentBody.focus();
    }

    render() {
        const {
            handleSubmit,
            submitting,
            parentId,
            match
        } = this.props;

        const {category} = match.params;

        return (
            <div className="row">
                <div className="col-12 col-md-6">
                    <form className="mt-3 mb-4" onSubmit={handleSubmit(this.submitForm)}>

                        <Field inputRef={el => this.commentBody = el} name="body" label="Comment"
                               component={renderTextarea} rows="5"/>
                        <button type="submit" disabled={submitting} className="btn btn-lg btn-outline-primary">
                            {this.isNewComment ? 'Add Comment' : 'Edit Comment'}
                        </button>
                        <Link to={`/${category}/${parentId}`}
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
        errors.body = "Comment is required";
    }

    return errors;
};

const mapStateToProps = (state, props) => {
    const commentId = props.match.params['comment_id'];
    const initialValues = commentId ? state.comments[commentId] : {};
    const parentId = initialValues.parentId ? initialValues.parentId : props.match.params['post_id'];

    return {
        initialValues: initialValues,
        parentId
    }
};


const formWithRedux = reduxForm({form: 'CommentForm', validate})(CommentForm);

export default connect(mapStateToProps, {createComment, fetchComment, editComment})(formWithRedux);

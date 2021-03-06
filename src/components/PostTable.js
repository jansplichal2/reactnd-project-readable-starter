import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {fetchAllPosts, downVote, upVote, removePost} from '../actions/posts'
import {fetchCommentsForPost} from '../actions/comments';
import {formatTimestamp, stateMap} from '../util/utils';
import _ from 'lodash';
import Controls from './Controls';
import DeleteModal from './DeleteDialog';

class PostTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            postId: '',
            sortName: 'timestamp',
            sortOrder: 'desc',
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteAndClose = this.deleteAndClose.bind(this);
        this.commentCount = this.commentCount.bind(this);
    }

    deleteAndClose() {
        this.props.removePost(this.state.postId)
            .then(() => this.closeModal());
    }

    openModal(id) {
        this.setState({modalIsOpen: true, postId: id});
    }

    closeModal() {
        this.setState({modalIsOpen: false, postId: ''});
    }

    componentDidMount() {
        this.props.fetchAllPosts().then(
            posts => (posts.map(post => this.props.fetchCommentsForPost(post)))
        );
    }

    createLink(post) {
        return `${post.category}/${post.id}`
    }

    commentCount(postId) {
        const commentNo = _.size(_.pickBy(this.props.comments, comment => comment.parentId === postId));
        return commentNo;
    }

    isSortActive(column, order) {
        const {sortName, sortOrder} = this.state;
        const isActive = column === sortName && order === sortOrder;
        return isActive ? 'active' : '';
    }

    changeSort(column) {
        return () => {
            this.setState((prevState) => {
                return {
                    sortName: column,
                    sortOrder: prevState.sortName === column ? stateMap[prevState.sortOrder] : 'desc'
                };
            });
        }
    }

    render() {
        const {posts} = this.props;

        if (_.isEmpty(posts)) {
            return <div>No posts available</div>
        }
        const sortedPosts = _.orderBy(posts, this.state.sortName, this.state.sortOrder);

        const postId = this.state.postId;
        const body = posts[postId] ? posts[postId].title : '';

        return (<div>

                <table className="table">
                    <thead className="thead-inverse">
                    <tr>
                        <th>Title</th>
                        <th onClick={this.changeSort('timestamp')} className="sortable-table-header">Created&nbsp;<span
                            className="sorting-arrows"><span
                            className={this.isSortActive('timestamp', 'asc')}>&uarr;</span><span
                            className={this.isSortActive('timestamp', 'desc')}>&darr;</span></span>
                        </th>
                        <th onClick={this.changeSort('voteScore')} className="sortable-table-header">Score&nbsp;<span
                            className="sorting-arrows"><span
                            className={this.isSortActive('voteScore', 'asc')}>&uarr;</span><span
                            className={this.isSortActive('voteScore', 'desc')}>&darr;</span></span>
                        </th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Comments</th>
                        <th>Control</th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(sortedPosts, (post) => {
                        return (
                            <tr key={post.id}>
                                <td><Link to={this.createLink(post)}>{post.title}</Link></td>
                                <td>{formatTimestamp(post.timestamp)}</td>
                                <td className="numberic_right_align">{post.voteScore}</td>
                                <td>{post.author}</td>
                                <td>{post.category}</td>
                                <td className="numberic_right_align">{this.commentCount(post.id)}</td>
                                <td className="controls_column">
                                    <Controls objectId={post.id}
                                              onVoteUp={(id) => (this.props.upVote(id))}
                                              onVoteDown={(id) => (this.props.downVote(id))}
                                              onEdit={(id) => (this.props.history.push(`/posts/edit/${id}`))}
                                              onDelete={(id) => (this.openModal(id))}/>
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
                <DeleteModal modalLabel="Post Table Delete Dialog"
                             isOpen={this.state.modalIsOpen}
                             title="Delete Post"
                             successBtnLabel="Delete Post"
                             body={body}
                             closeFn={this.closeModal}
                             successFn={this.deleteAndClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const category = props.category;
    const posts = category ?
        _.pickBy(state.posts, post => post.category === category) : state.posts;

    return {
        posts,
        comments: state.comments
    }
};

const enhance = compose(withRouter, connect(mapStateToProps,
    {
        fetchAllPosts,
        fetchCommentsForPost,
        downVote,
        upVote,
        removePost
    }));

export default enhance(PostTable);
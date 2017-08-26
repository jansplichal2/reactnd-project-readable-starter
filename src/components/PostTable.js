import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllPosts} from '../actions/posts'
import {formatTimestamp} from '../util/utils';
import _ from 'lodash';
import Controls from './Controls';

class PostTable extends Component {

    componentDidMount() {
        this.props.load();
    }

    createLink(post) {
        return `${post.category}/${post.id}`
    }

    render() {
        const {posts} = this.props;

        return (
            <table className="table">
                <thead className="thead-inverse">
                <tr>
                    <th>Title</th>
                    <th className="sortable-table-header">Created&nbsp;<span
                        className="sorting-arrows">&uarr;&darr;</span></th>
                    <th className="sortable-table-header">Score&nbsp;<span
                        className="sorting-arrows">&uarr;&darr;</span></th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Comments</th>
                    <th>Control</th>
                </tr>
                </thead>
                <tbody>
                {_.map(posts, (post) => {
                    return (
                        <tr key={post.id}>
                            <td><Link to={this.createLink(post)}>{post.title}</Link></td>
                            <td>{formatTimestamp(post.timestamp)}</td>
                            <td className="numberic_right_align">{post.voteScore}</td>
                            <td>{post.author}</td>
                            <td>{post.category}</td>
                            <td className="numberic_right_align">5</td>
                            <td className="controls_column">
                                <Controls objectId={post.id}
                                          onVoteUp={(id) => (console.log('Vote up', id))}
                                          onVoteDown={(id) => (console.log('Vote down', id))}
                                          onEdit={(id) => (console.log('Edit', id))}
                                          onDelete={(id) => (console.log('Delete', id))}/>
                            </td>
                        </tr>
                    );
                })}

                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(fetchAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostTable);
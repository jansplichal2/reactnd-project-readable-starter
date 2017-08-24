import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllPosts} from '../actions/posts'
import _ from 'lodash';

class PostTable extends Component {

    componentDidMount() {
        this.props.load();
    }

    render() {
        const {posts} = this.props;
        //console.log(posts);

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
                            <td><a href="#">{post.title}</a></td>
                            <td>{post.timestamp}</td>
                            <td className="numberic_right_align">{post.voteScore}</td>
                            <td>{post.author}</td>
                            <td>{post.category}</td>
                            <td className="numberic_right_align">5</td>
                            <td className="controls_column">
                                <i className="fa fa-thumbs-up" aria-hidden="true" title="Vote up"/>
                                <i className="fa fa-thumbs-down" aria-hidden="true" title="Vote down"/>
                                <br/>
                                <i className="fa fa-edit" aria-hidden="true" title="Edit"/>
                                <i className="fa fa-trash" aria-hidden="true" title="Remove"/>
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
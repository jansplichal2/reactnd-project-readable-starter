import * as Utils from './utils';

const api = "http://localhost:5001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json());

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json());

export const getCategoryPosts = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json());

export const getPost = (id) =>
    fetch(`${api}/posts/${id}`, {headers})
        .then(res => res.json());

export const getPostComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json());

export const getComment = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json());

export const removeComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json());

export const removePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json());

const voteOnComment = (id, option) => {
  return fetch(`${api}/comments/${id}`, {
      method: 'POST',
      headers: {
          ...headers,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          option
      })
  })
      .then(res => res.json());
};

const voteOnPost = (id, option) => {
    return fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            option
        })
    })
        .then(res => res.json());
};

export const upVoteComment = (id) => {
    return voteOnComment(id, "upVote");
};

export const downVoteComment = (id) => {
    return voteOnComment(id, "downVote");
};

export const upVotePost = (id) => {
    return voteOnPost(id, "upVote");
};

export const downVotePost = (id) => {
    return voteOnPost(id, "downVote");
};

export const createPost = ({ body, title, category }) => {
  const newPost = {
      id: Utils.getUUID(),
      timestamp: Utils.getTimestamp(),
      body,
      author: token,
      title,
      category
  };

  return fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
          ...headers,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
  }).then(res => res.json());
};

export const createComment = (parentId, body) => {
    const newComment = {
        id: Utils.getUUID(),
        timestamp: Utils.getTimestamp(),
        body,
        author: token,
        parentId
    };

    return fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    }).then(res => res.json());
};


export const editPost = ( {id, title, body} ) => {
    const post = { title, body };

    return fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
};

export const editComment = ( {id, body} ) => {
    const comment = { body, timestamp: Utils.getTimestamp() };

    return fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
};
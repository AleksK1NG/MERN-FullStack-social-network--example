import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deletePost, likePost, unlikePost } from '../../../ducks/post/postActions'
import { isAuthenticatedSelector, isLoadingSelector, userSelector } from '../../../ducks/auth/authSelectors'

const PostItem = ({
  likePost,
  unlikePost,
  deletePost,
  isAuthenticated,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
  isLoadingAuth
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="Avatar" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button onClick={() => likePost(_id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up" /> <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button onClick={() => unlikePost(_id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
          </Link>
          {!isLoadingAuth && user === user._id && (
            <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger">
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
)

PostItem.defaultProps = {
  showActions: true
}

export default connect(
  (state) => ({
    isAuthenticated: isAuthenticatedSelector(state),
    // user: userSelector(state),
    isLoadingAuth: isLoadingSelector(state)
  }),
  { deletePost, likePost, unlikePost }
)(PostItem)

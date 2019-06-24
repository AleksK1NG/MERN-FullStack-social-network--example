import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const CommentItem = ({ postId, comment: { _id, text, name, avatar, user, date }, deleteCommentFromPost, currentUser }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {currentUser && currentUser._id === user && (
          <button onClick={() => deleteCommentFromPost(postId, _id)} type="button" className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        )}
        <button onClick={() => deleteCommentFromPost(postId, _id)} type="button" className="btn btn-danger">
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  )
}

export default CommentItem

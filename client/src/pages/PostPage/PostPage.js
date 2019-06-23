import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { isLoadingSelector, postSelector } from '../../ducks/post/postSelectors'
import { getPostById } from '../../ducks/post/postActions'
import Spinner from '../../components/Shared/Spinner/Spinner'
import { userSelector } from '../../ducks/auth/authSelectors'
import { loadUser } from '../../ducks/auth/authActions'
import PostItem from '../../components/Post/PostItem/PostItem'
import CommentItem from '../../components/Post/CommentItem/CommentItem'
import CommentForm from '../../components/Post/CommentForm/CommentForm'
import { Link } from 'react-router-dom'

const PostPage = ({ getPostById, post, match, isLoading, currentUser, loadUser }) => {
  useEffect(() => {
    getPostById(match.params.id)
    loadUser()
  }, [getPostById, match.params.id, loadUser])

  if (isLoading || !post) return <Spinner />

  return (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} currentUser={currentUser} />

      <CommentForm post={post} />

      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  )
}

export default connect(
  (state) => ({
    post: postSelector(state),
    isLoading: isLoadingSelector(state),
    currentUser: userSelector(state)
  }),
  { getPostById, loadUser }
)(PostPage)

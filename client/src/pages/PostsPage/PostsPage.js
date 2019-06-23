import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../../ducks/post/postActions'
import { isLoadingSelector, postsSelector } from '../../ducks/post/postSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'
import PostItem from '../../components/Post/PostItem/PostItem'

const PostsPage = ({ posts, getAllPosts, isLoading }) => {
  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])

  if (isLoading || !posts) return <Spinner />

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1">
          <textarea name="text" cols="30" rows="5" placeholder="Create a post" required></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}

export default connect(
  (state) => ({
    posts: postsSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { getAllPosts }
)(PostsPage)

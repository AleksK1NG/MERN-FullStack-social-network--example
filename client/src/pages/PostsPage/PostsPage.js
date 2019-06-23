import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../../ducks/post/postActions'
import { isLoadingSelector, postsSelector } from '../../ducks/post/postSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'
import PostItem from '../../components/Post/PostItem/PostItem'
import PostForm from '../../components/Post/PostForm/PostForm'

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

      <PostForm />

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

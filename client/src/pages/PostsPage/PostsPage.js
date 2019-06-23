import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../../ducks/post/postActions'
import { isLoadingSelector, postsSelector } from '../../ducks/post/postSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'

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
        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>Alex Bryksin</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus
              nesciunt soluta suscipit nobis. Amet accusamus distinctio cupiditate blanditiis dolor? Illo perferendis
              eveniet cum cupiditate aliquam?
            </p>
            <p className="post-date">Posted on 04/16/2019</p>
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              <span>4</span>
            </button>
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <a href="post.html" className="btn btn-primary">
              Discussion <span className="comment-count">2</span>
            </a>
            <button type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>Alex Bryksin</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus
              nesciunt soluta suscipit nobis. Amet accusamus distinctio cupiditate blanditiis dolor? Illo perferendis
              eveniet cum cupiditate aliquam?
            </p>
            <p className="post-date">Posted on 04/16/2019</p>
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              <span>4</span>
            </button>
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <a href="post.html" className="btn btn-primary">
              Discussion <span className="comment-count">3</span>
            </a>
            <button type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
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

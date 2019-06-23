import React from 'react'

const PostPage = () => {
  return (
    <section className="container">
      <a href="posts.html" className="btn">
        Back To Posts
      </a>
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
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1">
          <textarea name="text" cols="30" rows="5" placeholder="Comment on this post" required></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="comments">
        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus
              nesciunt soluta suscipit nobis. Amet accusamus distinctio cupiditate blanditiis dolor? Illo perferendis
              eveniet cum cupiditate aliquam?
            </p>
            <p className="post-date">Posted on 04/16/2019</p>
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
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus
              nesciunt soluta suscipit nobis. Amet accusamus distinctio cupiditate blanditiis dolor? Illo perferendis
              eveniet cum cupiditate aliquam?
            </p>
            <p className="post-date">Posted on 04/16/2019</p>
            <button type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PostPage

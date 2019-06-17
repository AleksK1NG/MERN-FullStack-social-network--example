const Blog = require('../models/Blog');
const User = require('../models/User');

exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findById(id, (error, blog) => {
      if (error) {
        return res.status(422).send({ error });
      }

      res.status(200).json(blog);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.createBlog = async (req, res) => {
  const { title, author, imageURL, text } = req.body;
  try {
    const blog = new Blog({ title, author, imageURL, userId: req.user._id, text });
    console.log('CREATED blog =>', blog);
    blog.save((error, blog) => {
      if (error) {
        return res.status(422).send({ error });
      }
      return res.status(200).json(blog);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, author, imageURL, text } = req.body;
  try {
    await Blog.findByIdAndUpdate(id, { $set: { title, author, imageURL, userId: req.user._id, text } }, { new: true }).exec((error, blog) => {
      if (error) {
        return res.status(422).send({ error });
      }
      console.log('update blog  =>', blog);

      return res.status(200).json(blog);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndRemove(id).exec((error, blog) => {
      if (error) {
        return res.status(422).send({ error });
      }

      res.status(200).json(blog);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getBlogsByPage = async (req, res) => {
  const { pageNumber, pageSize } = req.body;

  try {
    const blogs = await Blog.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getBlogsByUserId = async (req, res) => {
  const { pageNumber, pageSize } = req.body;
  const { userId } = req.params;
  console.log('GET Blogs by User ID => ', userId);
  try {
    const blogs = await Blog.find({ userId: userId })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    if (!blogs) return res.status(404).send('Blogs with the given User ID was not found.');

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.createUserBlog = async (req, res) => {
  const { userData, blog } = req.body;

  try {
    await User.findById(userData._id, (error, user) => {
      if (error) {
        return res.status(422).send({ error });
      }

      const newBlog = new Blog({
        ...blog,
        user
      });

      user.blogs.unshift(newBlog);

      return Promise.all([user.save(), newBlog.save()])
        .then((result) => res.status(200).json(result))
        .catch((errors) => res.status(422).send({ errors }));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


exports.deleteUserBlog = async (req, res) => {
  const { userId, blogId } = req.body;

  console.log('CREATE BLOG USER DATA => ', userId);
  console.log('CREATE BLOG BLOG => ', blogId);
  try {
    await Blog.findByIdAndUpdate(blogId, { $set: {} }, { new: true }).exec((error, blog) => {
      if (error) {
        return res.status(422).send({ error });
      }
      console.log('update blog  =>', blog);

      return res.status(200).json(blog);
    });

    Promise.all([
      // User.updateOne({ _id: user._id }, { $pull: { blogs: blogId } }),
      newBlog.save(),
      newUser.save()
      // Blog.updateOne({ _id: blog._id },  { user: userId } )
    ])
      .then((result) => res.status(200).json(result))
      .catch((errors) => res.status(422).send({ errors }));
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

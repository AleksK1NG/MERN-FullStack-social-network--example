const User = require('../models/User');
const Blog = require('../models/Blog');
const passport = require('passport');

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findById(id, (error, user) => {
      if (error) {
        return res.status(422).send({ error });
      }

      res.status(200).json(user);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getCurrentUser = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.sendStatus(422);
  }

  // For Session Auth!
  // return res.json(user);
  return res.json(user.toAuthJSON());
};

exports.getAllUsers = async (req, res) => {
  console.log('GET All Users');
  try {
    const users = await User.find();
    if (!users) {
      return res.status(422).send({ error });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.registerUser = async (req, res) => {
  const { email, password, name, info } = req.body;
  console.log('Register user body => ', req.body);
  try {
    const user = new User({ email, password, name, info });
    await user.save((error, user) => {
      if (error) {
        return res.status(422).send({ error });
      }

      return res.status(200).json(user.toAuthJSON());
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('LOGIN user => ', req.body);
    if (!email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
          message: 'Email is required'
        }
      });
    }

    if (!password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
          message: 'Password is required'
        }
      });
    }
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  const { email, password, username, name, info } = req.body;
  const { id } = req.params;
  console.log('params id => ', id);
  console.log('req body => ', req.body);
  try {
    await User.findByIdAndUpdate(id, { $set: { email, password, username, name, info } }, { new: true }).exec(
      (error, user) => {
        if (error) {
          return res.status(422).send({ error });
        }
        console.log('update blog  =>', user);

        return res.status(200).json(user);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id).exec((error, user) => {
      if (error) {
        return res.status(422).send({ error });
      }

      res.status(200).json(user);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getUsersByPage = async (req, res) => {
  const { pageNumber, pageSize } = req.body;

  try {
    const users = await User.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.login = function(req, res, next) {
  const { email, password } = req.body;
  console.log('req login', email, password);
  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        message: 'Email is required'
      }
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
        message: 'Password is required'
      }
    });
  }

  return passport.authenticate('local', (err, passportUser) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      // Only For Session Auth!!!
      // req.login(passportUser, function (err) {
      //   if (err) { next(err); }

      //   return res.json(passportUser)
      // });

      return res.json(passportUser.toAuthJSON());
    } else {
      return res.status(422).send({
        errors: {
          message: 'Invalid password or email'
        }
      });
    }
  })(req, res, next);
};

const adminCredentials = require('../models/adminCredentials');

exports.login = (req, res) => {
  res.render('admin');
};

exports.handleLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === adminCredentials.username && password === adminCredentials.password) {
    // For now, just send back a success message
    res.send("Login successful!");
  } else {
    res.status(401).send("Unauthorized: Incorrect username or password");
  }
};

'use strict';

class AuthController {
  login(req, res) {
    res.render(`auth/login`);
  }

  signUp(req, res) {
    res.render(`auth/sign-up`);
  }
}

module.exports = new AuthController();

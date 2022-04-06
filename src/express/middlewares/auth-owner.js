'use strict';

module.exports = (req, res, next) => {
  const {user} = req.session;

  if (user.roleId !== 2) {
    res.redirect(`/`);
  } else {
    next();
  }
};

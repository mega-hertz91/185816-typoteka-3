'use strict';

module.exports = (UserDataService) => {
  return async (req, res, next) => {
    const currentUser = await UserDataService.getById(req.body.userId);

    if (!currentUser) {
      res
        .status(401)
        .send(`User unauthorized`);
    } else {
      next();
    }
  };
};

module.exports.checkIfUserAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

module.exports.addUserToLocal = (req, res, next) => {
  if (req.session.isAuthenticated) {
    res.locals.user = { ...req.session.user, isAuthenticated: true };
  } else {
    res.locals.user = { isAuthenticated: false };
  }
  return next();
};

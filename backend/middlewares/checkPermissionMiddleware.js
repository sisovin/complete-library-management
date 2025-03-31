const AppError = require('../utils/error/AppError');

// Middleware to check permissions
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions;

    if (!userPermissions.includes(requiredPermission)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

module.exports = checkPermission;

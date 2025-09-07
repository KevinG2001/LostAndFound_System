function permit(...allowedPermissions) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasPermission = req.user.permissions.some((p) =>
      allowedPermissions.includes(p)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}

module.exports = permit;

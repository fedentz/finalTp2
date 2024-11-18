export const isAdmin = (req, res, next) => {
    try {
      const { roleId } = req.user; 
      if (roleId !== 1) {
        console.log("isAdmin mw - roleId:", roleId)
        return res.status(403).json({ error: "Access denied. Admins only." });
      }
      next();
    } catch (error) {
      console.error("Error in isAdmin middleware:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  };
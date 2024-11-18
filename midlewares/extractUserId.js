import { verifyToken } from "../utils/token.js";

export const extractUserId = (req, res, next) => {
  try {
    const { token } = req.cookies; 
    if (!token) throw new Error("No token provided"); 
    const decoded = verifyToken(token); 
    req.userId = decoded.data.id; 
    next(); 
  } catch (error) {
    res.status(401).json({ success: false, message: error.message }); 
  }
};
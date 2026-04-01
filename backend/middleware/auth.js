import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const tokenHeader = req.headers.token;

    if (!authHeader && !tokenHeader) {
      return res.json({ success: false, message: "Not authorized, login again" });
    }

    // Support both "Bearer <token>" and direct "token" header
    const token = authHeader ? authHeader.split(" ")[1] : tokenHeader;
    
    if (!token) {
      return res.json({ success: false, message: "Not authorized, login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;

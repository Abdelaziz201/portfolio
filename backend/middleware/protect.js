import jwt from "jsonwebtoken";

/**
 * Require a valid JWT (cookie or Authorization: Bearer).
 * Used for admin-only routes such as listing uploaded photos.
 */
export const protect = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ message: "Not authorized" });
    }
};

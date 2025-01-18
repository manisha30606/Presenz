import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user to the request
        next();
    } catch (err) {
        console.error("JWT Error:", err.message); // Log for debugging
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Invalid or malformed token" });
    }
};

export default ensureAuthenticated;

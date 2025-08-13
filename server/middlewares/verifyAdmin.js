// const jwt = require("jsonwebtoken");
// require("dotenv").config(); // Make sure .env is loaded

// const verifyAdmin = (req, res, next) => {
//     try {
//         // 1. Get token from Authorization header: "Bearer <token>"
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ message: "No token provided" });
//         }

//         // 2. Verify token
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 return res.status(403).json({ message: "Invalid token" });
//             }

//             // 3. Check role
//             if (!decoded.role || decoded.role !== "admin") {
//                 return res.status(403).json({ message: "Access denied: Admins only" });
//             }

//             // 4. Pass decoded user data to next middleware/route
//             req.user = decoded;
//             next();
//         });

//     } catch (error) {
//         console.error("Error in verifyAdmin middleware:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = verifyAdmin;

//hiiii
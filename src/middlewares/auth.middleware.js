// Firebase Admin app initialize হবে
require("../config/firebaseAdmin");

const { getAuth } = require("firebase-admin/auth");

const auth = getAuth();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    const decoded = await auth.verifyIdToken(token);

    req.token_email = decoded.email;
    console.log("verified user email:", req.token_email);
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;

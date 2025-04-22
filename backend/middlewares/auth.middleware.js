import jwt from "jsonwebtoken";

const authMiddleware = async function (req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized - Please Login",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.error("Error at user authentication", error);
    res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default authMiddleware;

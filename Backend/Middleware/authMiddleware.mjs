import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  console.log(authHeader);

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorizetion denied!" });
    }
    try {
      const decode = jwt.verify(token, "mySecretKey123");
      req.user = decode;
      console.log("decoded user:", req.user);
      next();
    } catch (error) {
      res.status(400).json({ message: "Token is not valid!" });
    }
  } else {
    res.status(401).json({ message: "User is not authorized!" });
  }
};

export default validateToken;

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
//authentication
async function authentication(req, res, next) {
  if (!req.headers.authentication) {
    return res
      .status(401)
      .json({ message: "you are not have access , please login" });
  }
  //verify token
  //jwt.verify(req.headers.authentication , process.env.SECRET)
  try {
    var decoded = await promisify(jwt.verify)(
      req.headers.authentication,
      process.env.SECRET
    );
    console.log(decoded.id);
    req.id = decoded.id;
  } catch (err) {
    return res.status(401).json({ message: "you are not authenticated" });
  }
  next();
}
module.exports = authentication;

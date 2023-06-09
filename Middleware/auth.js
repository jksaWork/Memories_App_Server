import jwt from "jsonwebtoken";

export const Auth = (req, res, next) => {
  //   console.log(req.headers.Authorization);
  //   console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const { id, user } = jwt.verify(token, "test");

    req.user = user;
    req.userId = id;
  }
  next();
};

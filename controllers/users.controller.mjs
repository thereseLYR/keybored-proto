import { generateHash, verifyHash } from "../utils/auth.mjs";

class UserController {
  constructor(db) {
    this.db = db;
  }

  postNewUser = async (request, response) => {
    const body = request.body;
    try {
      // 1. add new user info to db
      const result = await this.db.Users.create({
        username: body.username,
        password: generateHash(body.password),
      });
      console.log("postNewUser result: ", result.toJSON());

      // 2. add user_id and login hash to cookies
      const sessionHash = generateHash(result.username);
      const userId = result.id;
      response.cookie("user_id", `${userId}`);
      response.cookie("logged_in", `${sessionHash}`);

      response.json({
        result: `new user created successfully with user_id: ${userId}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  postLoginSession = async (request, response) => {
    const body = request.body;
    try {
      // 1. get username and password from user table
      const username = body.username;
      console.log("getting user with username: ", username);
      const user = await this.db.Users.findOne({
        where: { username: username },
      });
      console.log("user: ", user);

      // 2. verify password from request body is the same as password (unhashed) in user table
      if (!verifyHash(body.password, user.password)) {
        response
          .status(401)
          .send("invalid login username or password, please try again");
      }

      // 3. use username as a session hash. Is this secure?
      const sessionHash = generateHash(username);
      response.cookie("user_id", `${user.id}`);
      response.cookie("logged_in", `${sessionHash}`);

      response.json({
        result: `login successful, session generated: ${sessionHash}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  verifyUser = async (request, response) => {
    const userId = request.cookies.user_id;
    const sessionHash = request.cookies.logged_in;
    let user = null;

    // 1. get username from user_id
    try {
      const user = await this.db.Users.findOne({
        where: { id: userId },
      });
      console.log("user: ", user);
    } catch (err) {
      console.log(err);
    }

    if (user === null) {
      return false;
    }

    return verifyHash(user.username, sessionHash);
  };

  logout = (request, response) => {
    response.clearCookie("logged_in");
    response.clearCookie("user_id");
    response.json({ redirect: "/" });
  };
}

export default UserController;

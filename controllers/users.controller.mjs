import { generateHash, verifyHash } from "../utils/auth.mjs";

class UserController {
  constructor(db) {
    this.db = db;
  }

  postNewUser = async (request, response) => {
    const body = request.body;
    try {
      const result = await this.db.Users.create({
        username: body.username,
        password: generateHash(body.password),
      });
      console.log("postNewUser result: ", result.toJSON());
      response.send(`new user created successfully with user_id: ${result.id}`);
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
      response.send(`login successful, session generated: ${sessionHash}`);
    } catch (err) {
      console.log(err);
    }
  };
}

export default UserController;

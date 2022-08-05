export default function initUsersController(db) {
  const something = async (request, response) => {
    try {
      const users = await db.Users.findAll();
      response.send({ users });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    something,
  };
}
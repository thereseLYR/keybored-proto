export default function initSongsController(db, userController) {
  const getAllSongs = async (request, response) => {
    try {
      const songs = await db.Songs.findAll();
      response.send({ songs });
    } catch (error) {
      console.log(error);
    }
  };

  const postNewSong = (request, response) => {
    // currently adds a new row every time the save button is clicked
    // to upgrade to findOrCreate later
    const userId = request.cookies.user_id;
    const sessionHash = request.cookies.logged_in;
    const body = request.body;
    console.log(parseInt(userId));
    console.log(`userId: ${userId}, sessionHash: ${sessionHash}`);

    // 1. check if userId and sessionHash are nil, throw error, disable song saving
    if (!(userId && sessionHash)) {
      response.status(401).json({
        error: `Guest user, please create an account to save your work`,
      });
      return;
    }

    // 2. if userId and sessionHash are not nil, validate them
    if (!userController.verifyUser(request, response)) {
      response.status(401).json({
        error: `User not authorized to perform this action, invalid userId: ${userId} and sessionHash: ${sessionHash}`,
      });
      return;
    }

    // 3. save song to db when userId and sessionHash is correct
    try {
      const result = db.Songs.create({
        title: body.title,
        songData: body.songData,
        creatorId: parseInt(userId),
      });
      console.log("postNewSong result: ", result.toJSON());
      response.send(`new song saved successfully with song id: ${result.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getAllSongs,
    postNewSong,
  };
}

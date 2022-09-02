class SongController {
  constructor(db, userController) {
    this.db = db;
    this.user = userController;
  }

  getAllSongs = async (request, response) => {
    try {
      const songs = await this.db.Songs.findAll();
      // console.log(songs);
      response.json({ result: songs, message: "get songs successful" });
    } catch (err) {
      console.log(err);
    }
  };

  getSongByID = async (request, response) => {
    const songID = request.params.song_id;
    try {
      const song = await this.db.Songs.findOne({
        where: {
          id: songID,
        },
      });
      // console.log(song);
      response.json({
        result: song,
        message: "successful get song from songId",
      });
    } catch (err) {
      console.log(err);
    }
  };

  postNewSong = async (request, response) => {
    // currently adds a new row every time the save button is clicked
    // to upgrade to findOrCreate later
    const userId = request.cookies.user_id;
    const sessionHash = request.cookies.logged_in;
    const body = request.body;

    // 1. check if userId and sessionHash are nil, throw error, disable song saving
    if (!(userId && sessionHash)) {
      response.status(401).json({
        error: `Guest user, please create an account to save your work`,
      });
      return;
    }

    // 2. if userId and sessionHash are not nil, validate them
    if (!this.user.verifyUser(request, response)) {
      response.status(401).json({
        error: `User not authorized to perform this action, invalid userId: ${userId} and sessionHash: ${sessionHash}`,
      });
      return;
    }

    // 3. save song to db when userId and sessionHash is correct
    try {
      const foundSong = await this.db.Songs.findOne({
        where: {
          title: body.title,
          creatorId: parseInt(userId),
        },
      });

      let queryResults;

      if (foundSong === null) {
        const newSong = await this.db.Songs.create({
          title: body.title,
          songData: body.songData,
          creatorId: parseInt(userId),
        });
        queryResults = { newSong, created: true };
      }
      const updatedSong = await this.db.Songs.update(
        {
          songData: body.songData,
        },
        { where: { title: body.title, creatorId: parseInt(userId) } }
      );
      queryResults = { updatedSong, created: false };
      console.log("query results:", queryResults);
    } catch (err) {
      console.error(err);
    }
  };
}

export default SongController;

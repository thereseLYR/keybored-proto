export default function initSongsController(db) {
  const getAllSongs = async (request, response) => {
    try {
      const songs = await db.Songs.findAll();
      response.send({ songs });
    } catch (error) {
      console.log(error);
    }
  };

  const postNewSong = async (request, response) => {
    // currently adds a new row every time the save button is clicked
    // to upgrade to findOrCreate later
    const body = request.body;
    console.log(parseInt(request.cookies.user_id));
    try {
      const result = await db.Songs.create({
        title: body.title,
        songData: body.songData,
        creatorId: parseInt(request.cookies.user_id),
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

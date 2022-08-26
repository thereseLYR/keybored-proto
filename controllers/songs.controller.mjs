export default function initSongsController(db) {
  const something = async (request, response) => {
    try {
      const songs = await db.Songs.findAll();
      response.send({ songs });
    } catch (error) {
      console.log(error);
    }
  };

  const postNewSong = async (request, response) => {
    // okay it posts
    // but now idk how to attach it to the user lol
    const body = request.body;
    console.log(parseInt(request.cookies.user_id))
    try {
      const result = await db.Songs.create({
        title: body.title,
        songData: body.songData, 
        creatorId: parseInt(request.cookies.user_id)
      });
      console.log("postNewSong result: ", result.toJSON());
      response.send(`new song saved successfully with song id: ${result.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    something,
    postNewSong
  };
}

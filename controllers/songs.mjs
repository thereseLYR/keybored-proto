export default function initSongsController(db) {
  const something = async (request, response) => {
    try {
      const songs = await db.Songs.findAll();
      response.send({ songs });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    something,
  };
}
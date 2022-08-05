import { resolve } from 'path';
import db from './models/index.mjs';

import initUsersController from './controllers/users.mjs';
import initSongsController from './controllers/songs.mjs';

export default function routes(app) {
  const UsersController = initUsersController(db);
  const SongsController = initSongsController(db);

  // app.get('/items', ItemsController.index);

  // special JS page. Include the webpack index.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
# keybored-proto

![keybored logo](./src/assets/keyboard-96-web-left.svg)

Bored on your computer? Want to keysmash, jam, or make music to share, possibly in that exact order?
Try Keybored!

> keysmash?

Yes, unlike most other virtual keyboards which use traditional black-and-white keys, Keyboard uses a QWERTY layout.
That means that 'ASDFJKLKL;' is a perfectly valid note sequence to play a song.

> jam?

Create, playback, and play your own songs with just your keyboard and a rudimentary understanding that notes to the left of they keyboard are lower in pitch than keys to the right of the keyboard!

> sharing music?

Saved songs are added to a global playlist where users can play your songs on demand.

## Setup

1. Clone this repo, navigate to keybored-proto root folder
2. Install all packages
   - run `npm i` in keybored-folder
3. Create .env file in the root folder and fill with contents

   ```
   POSTGRES_USERNAME=<your_postgres_username>
   POSTGRES_PASSWORD=<your_postgres_pw>
   POSTGRES_HOST=<your_postgres_host>
   POSTGRES_DATABASE=keybored_development
   SALT=<any word or phrase> // this is used for pw encryption
   ```

4. Setup database locally
   - Create db with: `npx sequelize db:create`
   - Run db migrations with: `npx sequelize db:migrate`
   - Optional: to undo db migrations run: `npx sequelize db:migrate:undo`
   - Seed data into db with: `npx sequelize db:seed`

## How to run locally

In keybored-proto root folder, run:

- `npm run watch` to start the server
- start a browser and navigate to `localhost:3004`

Using the seeded data to login

- Select Play as a Registered User and login with user seeded credentials
  - username: `supercomposer`
  - password: `supercomposer123`
- Alternatively you can choose to create a new user through the registration page

Once in the keybored main page, play with music notes using your keyboard home row keys: `asdf jkl;` for music notes `CDEF GHAB` respectively to compose your own songs. Give your composed song a title and hit the save button to store the song into the db

## List of Resources

#### Core Functionality

- [react-simple-keybored](https://github.com/hodgef/react-simple-keyboard)
- [jazz-midi](https://github.com/jazz-soft/JZZ)
- [express](https://www.npmjs.com/package/express)
- [pg](https://www.npmjs.com/package/pg)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [react](https://www.npmjs.com/package/react)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [mui, aka Material UI](https://mui.com/material-ui/getting-started/overview/)

#### Support Utils

- [cookier-parser](https://www.npmjs.com/package/cookie-parser)
- [js-cookie](https://www.npmjs.com/package/js-cookie)
- [prettier-plugin-organize-imports](https://www.npmjs.com/package/prettier-plugin-organize-imports)
- [dotenv](https://www.npmjs.com/package/dotenv)

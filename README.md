# keybored-proto
I need help describing this part

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
Core Functionality
    - react-simple-keyboard 
    - jazz-midi (for sounds)
    - express
    - postgres + sequelize
    - react
    - react-router-dom
    - material-ui

Support Utils
    - cookie-parser + js-cookie
    - prettier-plugin-organize-imports (plugin for sorting our imports)
    - dotenv
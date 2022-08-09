# keybored-proto

## 1.Setup

1. Install all packages
    - run `npm i` in keybored-folder t
2. Create .env file and fill with contents

    ```
    POSTGRES_USERNAME=<your_postgres_username>
    POSTGRES_PASSWORD=<your_postgres_pw>
    POSTGRES_HOST=<your_postgres_host>
    POSTGRES_DATABASE=keybored_development
    ```

3. Setup database locally
    - Create db with `npx sequelize db:create`
    - Run db migrations with `npx sequelize db:migrate`
    - Optional: to undo db migrations run `npx sequelize db:migrate:undo`

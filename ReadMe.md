### Running the React project

1. Once the repository has been cloned, navigate to the directory where the repository was cloned.

2. Open a command prompt or terminal window in that directory.

3. Run the following command:

   `npm install`

   This will install all of the dependencies for the Express API.

4. Create a file called `.env` in the root directory of the repository. This file will contain the environment variables for connecting to MongoDB and for other secret values.

    `DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_HOST_NAME=your_db_hostname
    MONGO_DB_NAME=your_mongo_db_name
    JWT_SECRET=your_jwt_secret
    POSTMAN_API_KEY=your_postman_api_key
    `

*  The `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST_NAME`, and `MONGO_DB_NAME` environment variables should be replaced with the actual credentials for your MongoDB database.

* The `JWT_SECRET` environment variable should be a long, random string that will be used to generate JWT tokens.

* The `POSTMAN_API_KEY` environment variable is used to authenticate requests to the user deletion endpoint. This endpoint is only accessible through Postman, so the API key is used to ensure that only authorized users can access it.

5. Once the dependencies have been installed and the environment variables have been set, run the following command to start the Express server in development mode:

    `npm run dev`

    This command will start the Express server on http://localhost:8080/.
# Node-express-starting-project

##### **_This README includes instructions for developers and maintainers for this project._**

#

## Technology Stack

- **Architecture** : Monolithic MVC
- **Language** : Node.js
- **Framework** : Express.js
- **Database** : MongoDB
- **ODM** : Mongoose
- **Cache** : Redis
- **Cloud Logger** : Loggly
- **Cloud Provider** : AWS

## Getting started

---

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- Create `.env` file in the root. Take sample.env as an example
- `npm start` to start the local server

## Code Overview

### Dependencies

---

- [Express.js](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [Json web token](https://github.com/auth0/node-jsonwebtoken) - For generating JWT's used by authentication
- [Mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [Winston](https://github.com/winstonjs/winston) - For logging to console file and adding transports
- [Redis](https://github.com/NodeRedis/node_redis) - For caching, storing session
- [DotEnv](https://github.com/motdotla/dotenv) - Loading variables form .env to PROCESS_ENV
- [String-Format](https://github.com/davidchambers/string-format) - Used for formatting and interpolating strings

#### Dev-Dependencies

- [ESLint](https://github.com/eslint/eslint) - Linting Javascript Code
- [Nodemon](https://github.com/remy/nodemon) - Automatically restart node server wrt to changes

#

### Coding Pattern and Standards to be followed

---

#### Notations :

    - CamelCase coding pattern.
    - Appropriate variable names(avoid general variables).
    - Functions to be written using ( => ).
    - Avoid redundant code lines.
    - 'use strict';
    - No commented code

---

#### Standards :

    - Uncomment gitignore file to stop uploading secret file
    - Put Author and Date on every file
    - Write modular functional code
    - Avoid unnecessary looping /conditional statements, unless needed
    - Use Async Await
    - No unnecessary comments
    - use strict equality check(===) instead of (==)

---

#### Process :

    - 2 branches only:
        - Develop
        - Master

---

### Authors

---

#### Appyhigh : appyhigh@gmail.com

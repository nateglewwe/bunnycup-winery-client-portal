const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const userText = `INSERT INTO "user" ("email", "password", "access_level")
                    VALUES ($1, $2, $3) RETURNING id;`;

  pool
    .query(userText, [username, password, 10])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/', (req, res) => {
  const clientInfo = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  const updateQuery = `WITH "ins1" AS (
                        UPDATE "user" SET "password" = $1 WHERE "id" = $2
                        RETURNING "id"
                        ),
                        "ins2" AS (
                        UPDATE "clients" SET "name" = $3, "discount" = $4, "payment_type" = $5 WHERE "user_id" IN (SELECT "id" FROM "ins1")
                        RETURNING "id")
                      UPDATE "client_address" SET "street" = $6, "city" = $7, "state" = $8, "zip" = $9 WHERE "client_id" IN (SELECT "id" FROM "ins2");`;

  pool
    .query(updateQuery, [
      password,
      clientInfo.id,
      clientInfo.retailer,
      clientInfo.discount,
      clientInfo.paymentType,
      clientInfo.street,
      clientInfo.city,
      clientInfo.state,
      clientInfo.zip,
    ])
    .then((result) => {
      console.log('Client updated successfully');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Client update failed');
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const deleteInfo = req.params.id;
  const deleteQuery = ``;
});

module.exports = router;

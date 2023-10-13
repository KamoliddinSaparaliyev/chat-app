const router = require("express").Router();
const { listMessages } = require("../controller/messages");
const { listRooms } = require("../controller/rooms");
const { register, login, getMe, getUsers } = require("../controller/user");
const isLoggedIn = require("../shared/auth/is-loggedin");

//users
router.post("/register", register);
router.post("/login", login);
router.get("/me", isLoggedIn, getMe);
router.get("/users", isLoggedIn, getUsers);

//rooms
router.get("/rooms", isLoggedIn, listRooms);

//messages
router.get("/chat/:id", isLoggedIn, listMessages);

module.exports = router;

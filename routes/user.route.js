const router = require("express").Router();
const userController = require("../controller/user.controller");


/**
 * @Path /usersPim
 */

//router.route("/sign")
 //   .post(userController.signUpUser)
  //  .get(userController.signInUser);
    router
    .post("/signup", userController.signUpUser)
    router
    .post("/signin", userController.signInUser)
module.exports = router;
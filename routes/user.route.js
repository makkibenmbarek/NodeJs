const router = require("express").Router();
const { route } = require("express/lib/application");
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
    router
    .post("/googleSignin", userController.googleSignInUser)
    router.post("/updateProfile",userController.updateProfile)
    router
    .post("/resetPassword", userController.ResetPassword)
    router.get("/getUsers",userController.getAllUsers)
module.exports = router;
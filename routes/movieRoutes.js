const express = require("express");
const movieController = require("./../controllers/movieController");
const router = express.Router();

// Auth middleware
const ensureLoggedIn = (req, res, next) => {
  console.log("ensureLoggedIn middleware called");
  console.log("sessiondddd   " + req.session.user);
  if (req.session && req.session.user) {
    console.log("User is logged in");
    next();
  } else {
    console.log("User is not logged in. Redirecting to /login");
    res.redirect('/login');
  }
};

router
  .route("/home")
  .get(ensureLoggedIn, movieController.showHomePage);

router
  .route("/")
  .get(ensureLoggedIn, movieController.getAllMovies);

router
  .route("/add")
  .get(ensureLoggedIn, movieController.addMovie)
  .post(movieController.postMovie);

  router
  .route("/updateRender")
  .get(ensureLoggedIn, movieController.updateRender);


  router
  .route("/delete")
  .post(ensureLoggedIn, movieController.deleteMovie);


  router
  .route("/:id")
  .get(ensureLoggedIn, movieController.getMovie)
  .post(ensureLoggedIn, movieController.updateMovie)


module.exports = router;

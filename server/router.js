const express = require("express");
const router = express.Router();


const { 
  createListAndRedirect, 
  serveList 
} = require("./firebase");

router.get("/", createListAndRedirect);
router.get("/:listID", serveList);


module.exports = router;
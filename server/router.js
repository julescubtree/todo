const express = require("express");
const router = express.Router();


const { firestore } = require("./firebase");

router.get("/", function(req, res, next) {
  const newList = firestore.collection("lists").doc()

  newList.set({
    title: "To-do list:",
    todos: [],
  }).then(() => {
    res.redirect(`/${newList.id}`);
  })
  .catch(() => {
    next(new Error("firestore document set failed"));
  });
});

router.get("/:listID", function(req, res, next) {
  //res.send(req.params.listID);
  firestore.doc(`lists/${req.params.listID}`).get()
    .then( (snapshot) => {
      const todoList = snapshot.data();
      if(todoList!==undefined){
        res.json(todoList);
      }else{
        next(new Error("to-do list does not exist"));
      }
    })
    .catch(() => {
      next(new Error("firestore document get failed"));
    });
});


module.exports = router;
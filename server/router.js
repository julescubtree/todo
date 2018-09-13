const express = require("express");
const router = express.Router();


const { firestore, FieldValue } = require("./firebase");

router.get("/", function(req, res, next) {
  const newList = firestore.collection("lists").doc()
  const newListID = newList.id;
  let newListBatch = firestore.batch();

  newListBatch.set(newList, { title: "To-do list" });
  for(let i=0; i<3; i++){
    let newListItem = firestore.collection(`lists/${newListID}/todos`).doc();
    newListBatch.set(
      newListItem, 
      { 
        title: "To-do item", 
        desc: "To-do description",
        time: FieldValue.serverTimestamp(),
      }
    );
  }
  
  newListBatch.commit()
  .then(() => {
    res.redirect(`/${newListID}`);
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
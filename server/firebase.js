const path = require("path");

const fbAdmin = require("firebase-admin");
const fbServiceAccount = require("./_private/todo-41643-firebase-adminsdk-ftoej-d08f538a31.json");


const fbApp = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(fbServiceAccount),
  databaseURL: "https://todo-41643.firebaseio.com",
});

fbFirestore = fbApp.firestore();
fbFirestore.settings( { timestampsInSnapshots: true, } );

function createListAndRedirect(req, res, next) {
  const newList = fbFirestore.collection("lists").doc()
  const newListID = newList.id;
  let newListBatch = fbFirestore.batch();

  newListBatch.set(newList, { title: "To-do list" });
  for(let i=0; i<3; i++){
    let newListItem = fbFirestore.collection(`lists/${newListID}/todos`).doc();
    newListBatch.set(
      newListItem, 
      { 
        title: `To-do item #${i+1}`, 
        desc: "To-do description",
        time: fbAdmin.firestore.FieldValue.serverTimestamp(),
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
}

function serveList(req, res, next) {
  
  fbFirestore.doc(`lists/${req.params.listID}`).get()
    .then( (snapshot) => {
      const todoList = snapshot.data();
      if(todoList!==undefined){
        res.sendFile(path.join(__dirname, "public", "index.html"));
      }else{
        res.redirect("/");
      }
    })
    .catch(() => {
      next(new Error("firestore document get failed"));
    });
  //res.sendFile(path.join(__dirname, "public", "index.html"));
}

module.exports = {
  //firestore: fbFirestore,
  //FieldValue: fbAdmin.firestore.FieldValue,
  createListAndRedirect,
  serveList,
};
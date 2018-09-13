const fbAdmin = require("firebase-admin");

const fbServiceAccount = require("./_private/todo-41643-firebase-adminsdk-ftoej-d08f538a31.json");


const fbApp = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(fbServiceAccount),
  databaseURL: "https://todo-41643.firebaseio.com",
});

fbFirestore = fbApp.firestore();
fbFirestore.settings( { timestampsInSnapshots: true, } );


module.exports = {
  firestore: fbFirestore,
  FieldValue: fbAdmin.firestore.FieldValue,
};
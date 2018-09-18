import { combineReducers, compose, createStore } from "redux";

import firebase from "firebase/app";
//import "firebase/auth";
import "firebase/firestore";

import { firebaseReducer, reactReduxFirebase } from "react-redux-firebase";
import { firestoreReducer, reduxFirestore } from "redux-firestore";

import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import reduxReducer from "./reducers.js";


firebase.initializeApp({
  apiKey: "AIzaSyCxfB9_DALmIlpE-IQYyCYsqn5kncs9CTQ",
  authDomain: "todo-41643.firebaseapp.com",
  databaseURL: "https://todo-41643.firebaseio.com",
  projectId: "todo-41643",
  storageBucket: "todo-41643.appspot.com",
  messagingSenderId: "698767599698"
});
const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, {}),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  reduxState: reduxReducer,
});

const initialState = {
  reduxState: {
    listID: null,
    todoID: null,
  },
}

export const history = createBrowserHistory();

export const reduxStore = createStoreWithFirebase(
  connectRouter(history)(rootReducer), 
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
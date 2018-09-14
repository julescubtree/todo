import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { Spin } from "antd";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        { 
          isLoaded(this.props.listInfo) && isLoaded(this.props.todos)
          ? <div>
              <h1>{this.props.listInfo.title}</h1>
              <ol>
                {this.props.todos.map( (todo) => <li>{todo.title}</li> )}
              </ol>
            </div>
          : <Spin size="large" />
        }
      </div>
    );
  }
}


export default compose(
  firestoreConnect( (props) => {
    const matchedListID = props.match.params.listID;
    const listID = matchedListID!==undefined
      ? matchedListID
      : "test"; //DEBUG

    return [
      { 
        collection: "lists", 
        doc: listID,
        storeAs: "listInfo",
      },
      {
        //oh why doesn't this work. Oh well
        //path: "lists/yM900y6ccnXP0uik6zgO/todos", 
        collection: "lists", 
        doc: listID,
        subcollections: [
          {collection: "todos"}
        ],
        orderBy: "title",  // change this later
        storeAs: "todos",
      }
    ];
  }),
  connect(
    (state) => ({
      //todos: state.firebase.data["lists/yM900y6ccnXP0uik6zgO/todos"],
      listInfo: state.firestore.data.listInfo,
      todos: state.firestore.ordered.todos,
    })
  )
)(App);
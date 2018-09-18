import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { Card, Icon, Layout, Spin } from "antd";

import TodoMenu from "./TodoMenu";

const { Content, Header, Sider } = Layout;


class App extends React.Component {
  constructor(props){
    super(props);
    this.selectTodo = this.selectTodo.bind(this);
    this.updateTodoCompletion = this.updateTodoCompletion.bind(this);
    this.state = {
      currentTodoID: this.props.match.params.todoID ||  null,
    }
  }

  selectTodo(todoID){
    this.setState({
      currentTodoID: todoID,
    });
  }
  
  updateTodoCompletion(todoID, completed){
    const { listID } = this.props.match.params;
    const todo = this.props.firestore.doc(`lists/${listID}/todos/${todoID}`);
    todo.update( { completed } );
  }  

  render() {
    const displayedTodo = this.props.orderedTodos.find( (todo) => (todo.id===this.state.currentTodoID) )
      || this.props.orderedTodos[0];

    return (
      <div>
        {
          isLoaded(this.props.listInfo) && isLoaded(this.props.todos)
          ? <Layout>
              <Header style={{ background: "#FFF" }}><h1>{this.props.listInfo.title}</h1></Header>
              <Layout>
                <Sider theme="light">
                  <TodoMenu
                    orderedTodos={this.props.orderedTodos}
                    selectedTodoID={displayedTodo.id}
                    selectTodo={this.selectTodo}
                    updateTodoCompletion={this.updateTodoCompletion}
                  />
                </Sider>
                <Content>
                  <Card>
                    <Icon type="picture" theme="twoTone" style={{ fontSize: "196px" }}/>
                    <br />
                    {displayedTodo.desc}
                  </Card> 
                </Content>
              </Layout>
            </Layout>
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
        orderBy: "index",  // change this later
        storeAs: "todos",
      }
    ];
  }),
  connect( (state) => {
    //DEBUG temporary fix 
    const unorderedTodos = state.firestore.ordered.todos;
    const orderedTodos = unorderedTodos!==undefined
      ? [...unorderedTodos].sort( (a,b) => (a.index-b.index) )
      : [];

    return {
      //todos: state.firebase.data["lists/yM900y6ccnXP0uik6zgO/todos"],
      listInfo: state.firestore.data.listInfo,
      todos: state.firestore.ordered.todos, //DEBUG: still currently necessary while debugging for isLoaded
      orderedTodos,
    };
  })
)(App);
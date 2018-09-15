import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { Card, Checkbox, Icon, Layout, Menu, Spin } from "antd";
const { Content, Header, Sider } = Layout;


class App extends React.Component {
  render() {
    return (
      <div>
        {
          isLoaded(this.props.listInfo) && isLoaded(this.props.todos)
          ? <Layout>
              <Header style={{ background: "#FFF" }}><h1>{this.props.listInfo.title}</h1></Header>
              <Layout>
                <Sider theme="light">
                  <Menu>
                    {this.props.orderedTodos.map(todo => <Menu.Item key={todo.id}>{todo.title}<Checkbox /></Menu.Item>)}
                  </Menu>
                </Sider>
                <Content>
                  <Card>
                    <Icon type="picture" theme="twoTone" style={{ fontSize: "196px" }}/>
                    <br />
                    {this.props.todos[0].desc}
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
        orderBy: "title",  // change this later
        storeAs: "todos",
      }
    ];
  }),
  connect( (state) => {
    //DEBUG temporary fix 
    const unorderedTodos = state.firestore.ordered.todos;
    const orderedTodos = unorderedTodos!==undefined
      ? [...unorderedTodos].sort( (a,b) => (a.time.toMillis()-b.time.toMillis()) )
      : [];

    return {
      //todos: state.firebase.data["lists/yM900y6ccnXP0uik6zgO/todos"],
      listInfo: state.firestore.data.listInfo,
      todos: state.firestore.ordered.todos, //DEBUG: still currently necessary while debugging for isLoaded
      orderedTodos,
    };
  })
)(App);
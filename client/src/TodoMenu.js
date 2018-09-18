import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Menu } from "antd";


class TodoMenu extends React.Component {
  constructor(props){
    super(props);
    this.renderTodoMenuItem = this.renderTodoMenuItem.bind(this);
    this.selectTodo = this.selectTodo.bind(this);
  }

  selectTodo({item, key}){
    this.props.selectTodo(key);
  }

  renderTodoMenuItem(todo){
    return (
      <Menu.Item key={todo.id}>
        {todo.title}
        <Checkbox 
          checked={todo.completed} 
          onChange={ (e) => {this.props.updateTodoCompletion(todo.id, e.target.checked);} }
        />
      </Menu.Item>
    );
  }

  render(){
    return (
      <Menu defaultSelectedKeys={[this.props.orderedTodos[0].id]} onClick={this.selectTodo}>
        {this.props.orderedTodos.map(this.renderTodoMenuItem)}
      </Menu>
    );
  }
}


TodoMenu.propTypes = {
  orderedTodos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      desc: PropTypes.string,
      index: PropTypes.number,
      id: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
  selectTodo: PropTypes.func.isRequired,
  updateTodoCompletion: PropTypes.func.isRequired,
}


export default TodoMenu;
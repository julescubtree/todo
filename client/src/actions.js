export const SET_LIST_ID = "SET_LIST_ID";
export const SET_TODO_ID = "SET_TODO_ID";


export function setListID(listID){
  return {
    type: SET_LIST_ID,
    listID,
  }
}

export function setTodoID(todoID){
  return {
    type: SET_TODO_ID,
    todoID,
  }
}
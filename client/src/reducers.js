import {
  SET_LIST_ID, 
  SET_TODO_ID, 
} from "./actions";


function reduxReducer(state = {}, action){
  switch(action.type){
    case SET_LIST_ID:
      return {
        ...state,
        listID: action.listID,
      };
    case SET_TODO_ID:
      return {
        ...state,
        todoID: action.todoID,
      };
    default:
      return state;
  }
}


export default reduxReducer;
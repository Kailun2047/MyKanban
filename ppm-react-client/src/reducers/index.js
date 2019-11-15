import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectsReducer from "./projectsReducer";
import projectTasksReducer from "./projectTasksReducers";

export default combineReducers({
  errors: errorReducer,
  projectsResp: projectsReducer,
  projectTasksResp: projectTasksReducer
});

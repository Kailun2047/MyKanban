const initialState = {
  task: {},
  tasks: []
};

function projectTasksReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload
      };
    case "GET_TASK":
      return {
        ...state,
        task: action.payload
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(t => t.taskSequence !== action.payload)
      };
    default:
      return state;
  }
}

export default projectTasksReducer;

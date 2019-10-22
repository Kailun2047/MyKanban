const initialState = {
  projects: [],
  project: {}
};

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;
  }
}

export default projectsReducer;

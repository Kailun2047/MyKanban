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
    case "GET_PROJECT":
      return {
        ...state,
        project: action.payload
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(p => p.projectId !== action.payload)
      };
    default:
      return state;
  }
}

export default projectsReducer;

import axios from "axios";

export const createProject = (project, history) => async dispatch => {
  try {
    console.log("creating/updating");
    console.log(project);
    const resp = await axios.post("http://localhost:8080/api/project", project);
    // Wait until the post request is completed, then return to dashboard.
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: "GET_ERROR",
      payload: err.response.data
    });
  }
};

export const getProjects = () => async dispatch => {
  const resp = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: "GET_PROJECTS",
    payload: resp.data
  });
};

export const getProject = id => async dispatch => {
  const resp = await axios.get("http://localhost:8080/api/project/".concat(id));
  dispatch({
    type: "GET_PROJECT",
    payload: resp.data
  });
};

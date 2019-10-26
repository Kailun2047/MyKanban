import axios from "axios";

export const createProject = (project, history) => async dispatch => {
  try {
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

export const getProject = projectId => async dispatch => {
  const resp = await axios.get(
    "http://localhost:8080/api/project/".concat(projectId)
  );
  dispatch({
    type: "GET_PROJECT",
    payload: resp.data
  });
};

export const deleteProject = projectId => async dispatch => {
  const resp = await axios.delete(
    `http://localhost:8080/api/project/${projectId}`
  );
  dispatch({
    type: "DELETE_PROJECT",
    payload: projectId
  });
};

import axios from "axios";

export const createProjectTask = (
  projectId,
  projectTask,
  history
) => async dispatch => {
  try {
    const resp = await axios.post(
      `http://localhost:8080/api/backlog/${projectId}`,
      projectTask
    );
    history.push(`/projectBoard/${projectId}`);
  } catch (err) {
    dispatch({
      type: "GET_ERROR",
      payload: err.response.data
    });
  }
};

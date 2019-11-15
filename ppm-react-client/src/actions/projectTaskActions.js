import axios from "axios";

export const createProjectTask = (
  projectId,
  projectTask,
  history
) => async dispatch => {
  try {
    await axios.post(
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

export const getProjectTaskByProjectId = projectId => async dispatch => {
  const resp = await axios.get(
    `http://localhost:8080/api/backlog/${projectId}`
  );
  dispatch({
    type: "GET_TASKS",
    payload: resp.data
  });
};

export const getProjectTaskByTaskSequence = (
  projectId,
  taskSequence
) => async dispatch => {
  const resp = await axios.get(
    `http://localhost:8080/api/backlog/${projectId}/${taskSequence}`
  );
  dispatch({
    type: "GET_TASK",
    payload: resp.data
  });
};

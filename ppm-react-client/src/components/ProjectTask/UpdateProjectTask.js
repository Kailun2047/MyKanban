import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProjectTaskByTaskSequence,
  createProjectTask
} from "../../actions/projectTaskActions";
import { PropTypes } from "prop-types";
import classnames from "classnames";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      acceptanceCriteria: "",
      priority: "",
      status: "",
      dueDate: "",
      createdAt: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { projectId } = this.props.match.params;
    const newTask = {
      id: this.state.id,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      priority: this.state.priority,
      status: this.state.status,
      dueDate: this.state.dueDate,
      createdAt: this.state.createdAt
    };
    this.props.createProjectTask(projectId, newTask, this.props.history);
  }

  componentDidMount() {
    const { projectId, taskSequence } = this.props.match.params;
    this.props.getProjectTaskByTaskSequence(projectId, taskSequence);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
    if (newProps.projectTasksResp.task) {
      const task = newProps.projectTasksResp.task;
      this.setState({
        id: task.id,
        summary: task.summary,
        acceptanceCriteria: task.acceptanceCriteria,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
        createdAt: task.createdAt
      });
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="add-project-task">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <br />
              <h5 className="text-center">Add Project Task</h5>
              <br />
              <hr />
              <form onSubmit={this.handleSubmit}>
                <h6>Task Summary:</h6>
                <div className="form-group">
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.summary != null
                    })}
                    type="text"
                    name="summary"
                    placeholder="Task Summary"
                    value={this.state.summary}
                    onChange={this.handleChange}
                  ></input>
                  <div className="invalid-feedback">
                    Please provide a task summary.
                  </div>
                </div>
                <h6>Acceptance Criteria:</h6>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="acceptanceCriteria"
                    rows="1"
                    placeholder="Acceptance Criteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <h6>Task Priority:</h6>
                <div className="form-group">
                  <select
                    className="custom-select"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.handleChange}
                  >
                    <option value={0}>Set Task Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>
                <h6>Task Status:</h6>
                <div className="form-group">
                  <select
                    className="custom-select"
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option value="">Set Task Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Testing">Testing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <h6>Due Date:</h6>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="date"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-lg btn-secondary"
                    value="Submit"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  createProjectTask: PropTypes.func.isRequired,
  getProjectTaskByTaskSequence: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  projectTasksResp: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    projectTasksResp: state.projectTasksResp,
    errors: state.errors
  };
};

export default connect(mapStateToProps, {
  getProjectTaskByTaskSequence,
  createProjectTask
})(UpdateProjectTask);

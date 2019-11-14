import React, { Component } from "react";
import { connect } from "react-redux";
import { createProjectTask } from "../../actions/projectTaskActions";
import { PropTypes } from "prop-types";
import classnames from "classnames";

class AddProjectTask extends Component {
  constructor(props) {
    super(props);
    const { projectId } = this.props.match.params;
    this.state = {
      projectId: projectId,
      summary: "",
      acceptanceCriteria: "",
      priority: "",
      status: "",
      startDate: "",
      dueDate: "",
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
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      priority: this.state.priority,
      state: this.state.status,
      startDate: this.state.startDate,
      dueDate: this.state.dueDate
    };
    this.props.createProjectTask(projectId, newTask, this.props.history);
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
                <h6>Start Date:</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <h6>Due Date:</h6>
                <div
                  className="form-group"
                  name="dueDate"
                  value={this.state.dueDate}
                  onChange={this.handleChange}
                >
                  <input className="form-control" type="date"></input>
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

AddProjectTask.propTypes = {
  createProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { errors: state.errors };
};

export default connect(mapStateToProps, { createProjectTask })(AddProjectTask);

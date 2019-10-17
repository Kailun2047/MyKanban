import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { createProject } from "../../actions/createProject";
import { connect } from "react-redux";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectId: "",
      description: "",
      startDate: "",
      endDate: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectId: this.state.projectId,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.props.createProject(newProject, this.props.history);
  }

  render() {
    return (
      <div className="create">
        <div className="container">
          <div className="row">
            <div className="col-mid-8 m-auto">
              <br />
              <h5 className="text-center">Create a Project</h5>
              <hr />
              <form>
                <div className="from-group">
                  <input
                    type="text"
                    name="projectName"
                    className="form-control"
                    placeholder="Project name"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    name="projectId"
                    className="form-control"
                    placeholder="Unique Project ID"
                    value={this.state.projectId}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="description"
                    rows="1"
                    placeholder="Brief Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <h6>Start Date:</h6>
                <div className="form-group">
                  <input
                    type="date"
                    name="startDate"
                    className="form-control"
                    value={this.state.startDate}
                    onChange={this.handleChange}
                  />
                </div>
                <h6>Estimated End Date:</h6>
                <div className="form-group">
                  <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={this.state.endDate}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-lg btn-secondary"
                    value="Submit"
                    onSubmit={this.handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProject }
)(AddProject);

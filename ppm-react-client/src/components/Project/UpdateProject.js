import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      projectName: "",
      projectId: "",
      description: "",
      startDate: "",
      endDate: "",
      createdAt: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = function(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = function(e) {
    e.preventDefault();
    const newProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectId: this.state.projectId,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      createdAt: this.state.createdAt
    };
    this.props.createProject(newProject, this.props.history);
  };

  componentDidMount() {
    const { projectId } = this.props.match.params;
    this.props.getProject(projectId);
  }

  componentWillReceiveProps(newProp) {
    if (newProp.errors) {
      this.setState({
        errors: newProp.errors
      });
    }
    if (newProp.projectsResp.project) {
      const { project } = newProp.projectsResp;
      this.setState({
        id: project.id,
        projectName: project.projectName,
        projectId: project.projectId,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        createdAt: project.createdAt
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="update">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-mid-8">
              <br />
              <h5 className="text-center">Update a Project</h5>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.projectName != null
                    })}
                    type="text"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                  />
                  <div
                    className={classnames({
                      "invalid-feedback": errors.projectName
                    })}
                  >
                    {errors.projectName}
                  </div>
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    name="projectId"
                    className="form-control"
                    value={this.state.projectId}
                    readOnly="readOnly"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    className={classnames("form-control", {
                      "is-invalid": errors.description != null
                    })}
                    rows="1"
                    value={this.state.description}
                    onChange={this.handleChange}
                  ></textarea>
                  <div
                    className={classnames({
                      "invalid-feedback": errors.description
                    })}
                  >
                    {errors.description}
                  </div>
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

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object
};

const mapStateToProps = state => {
  return {
    projectsResp: state.projectsResp,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getProject, createProject }
)(UpdateProject);

import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";

class UpdateProject extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = function(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = function(e) {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectId: this.state.projectId,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.props.createProject(newProject, this.props.history);
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProject(id);
  }

  componentWillReceiveProps(newProp) {
    if (newProp.projectsResp.project) {
      const { project } = newProp.projectsResp;
      this.setState({
        projectName: project.projectName,
        projectId: project.projectId,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate
      });
    }
  }

  render() {
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
                    className="form-control"
                    type="text"
                    name="projectName"
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
                    value={this.state.projectId}
                    readOnly="readOnly"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    className="form-control"
                    rows="1"
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
  return { projectsResp: state.projectsResp };
};

export default connect(
  mapStateToProps,
  { getProject, createProject }
)(UpdateProject);

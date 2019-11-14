import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { createProject } from "../../actions/projectActions";
import { connect } from "react-redux";
import classnames from "classnames";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectId: "",
      description: "",
      startDate: "",
      endDate: "",
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
    const newProject = {
      projectName: this.state.projectName,
      projectId: this.state.projectId,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.props.createProject(newProject, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors != null) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="create">
        <div className="container">
          <div className="row">
            <div className="col-mid-8 m-auto">
              <br />
              <h5 className="text-center"> Create a Project</h5>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="projectName"
                    className={classnames("form-control", {
                      "is-invalid": errors.projectName != null
                    })}
                    placeholder="Project name"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{errors.projectName}</div>
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    name="projectId"
                    className={classnames("form-control", {
                      "is-invalid": errors.projectId != null
                    })}
                    placeholder="Unique Project ID"
                    value={this.state.projectId}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{errors.projectId}</div>
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    className={classnames("form-control", {
                      "is-invalid": errors.description != null
                    })}
                    rows="1"
                    placeholder="Brief Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  ></textarea>
                  <div className="invalid-feedback">{errors.description}</div>
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

const mapStateToProps = state => ({ errors: state.errors });

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { createProject })(AddProject);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";
import PropTypes from "prop-types";

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = function(e) {
    e.preventDefault();
    const { projectId } = this.props.project;
    this.props.deleteProject(projectId);
  };

  render() {
    const { project } = this.props;

    return (
      <div className="container">
        <div className="card card-body bg-light">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{project.projectId}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group list-group-mine">
                <Link to={`/projectBoard/${project.projectId}`}>
                  <li className="list-group-item board">
                    <i className="far fa-file-code"> Project Board</i>
                  </li>
                </Link>
                <Link to={`/updateProject/${project.projectId}`}>
                  <li className="list-group-item update">
                    <i className="far fa-edit">Update Project</i>
                  </li>
                </Link>
                <a href="." onClick={this.handleClick}>
                  <li className="list-group-item delete">
                    <i className="far fa-trash-alt"> Delete Project</i>
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(ProjectItem);

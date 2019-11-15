import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProjectTaskItem extends Component {
  render() {
    const { projectTask } = this.props;
    return (
      <div className="project-task">
        <hr />
        <div className="card border-secondary">
          <div className="card-header bg-light"></div>
          <div className="card-body">
            <h5 className="card-title">{projectTask.summary}</h5>
            <p className="card-text">{projectTask.acceptanceCriteria}</p>
            <Link
              to={`/updateProjectTask/${projectTask.projectId}/${projectTask.taskSequence}`}
            >
              <i className="btn btn-secondary">View/Update</i>
            </Link>
            <a href=".">
              <i className="btn btn-danger ml-1">Delete</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";

export default class ProjectTaskItem extends Component {
  render() {
    return (
      <div className="project-task">
        <hr />
        <div className="card">
          <div className="card-header">Task Name</div>
          <div className="card-body">
            <h5 className="card-title">Task Summary</h5>
            <p className="card-text">Acceptance criteria.</p>
            <a href="#" className="view-task">
              <i className="btn btn-secondary">View/Update</i>
            </a>
            <a href=".">
              <i className="btn btn-danger ml-1">Delete</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

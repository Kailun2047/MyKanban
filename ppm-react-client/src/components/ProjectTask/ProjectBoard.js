import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectTaskItem from "./ProjectTaskItem";

export default class ProjectBoard extends Component {
  render() {
    const { projectId } = this.props.match.params;
    return (
      <div className="projectBoard">
        <div className="container">
          <br />
          <Link
            to={`/addProjectTask/${projectId}`}
            className="btn btn-lg btn-secondary"
          >
            <i className="fas fa-plus-circle"> Add Task</i>
          </Link>
          <br />
          <hr />
          <div className="row">
            <div className="col-md">
              <div className="card bg-light">
                <div className="card-header text-center text-secondary h4">
                  <i className="fas fa-list-ul"> To Do</i>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-light">
                <div className="card-header text-center text-secondary h4">
                  <i className="fas fa-tasks"> In Progress</i>
                </div>
              </div>
              <ProjectTaskItem />
            </div>
            <div className="col-md">
              <div className="card bg-light">
                <div className="card-header text-center text-secondary h4">
                  <i className="fas fa-vial"> Testing</i>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-light">
                <div className="card-header text-center text-secondary h4">
                  <i className="fas fa-check-double"> Completed</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

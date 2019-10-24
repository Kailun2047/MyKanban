import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProjectItem extends Component {
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
                <a href="#">
                  <li className="list-group-item board">
                    <i className="far fa-file-code"> Project Board</i>
                  </li>
                </a>
                <Link to={`/updateProject/${project.projectId}`}>
                  <li className="list-group-item update">
                    <i className="far fa-edit">Update Project</i>
                  </li>
                </Link>
                <a href="#">
                  <li className="list-group-item delete">
                    <i className="far fa-trash-alt"> Delete Project</i>
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProjectBoard extends Component {
  render() {
    const { projectId } = this.props.match.params;
    return (
      <div>
        <div>Project Board</div>
        <ul className="list-group list-group-mine">
          <Link to={`/addProjectTask/${projectId}`}>
            <li className="list-group-item add">
              <i>Add Project Task</i>
            </li>
          </Link>
          <Link to={`/updateProjectTask/${projectId}`}>
            <li className="list-group-item update">
              <i>Update Project Task</i>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}

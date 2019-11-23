import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { deleteTask } from "../../actions/projectTaskActions";
import PropTypes from "prop-types";

class ProjectTaskItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = function(e) {
    e.preventDefault();
    const { projectTask } = this.props;
    this.props.deleteTask(projectTask.projectId, projectTask.taskSequence);
  };

  render() {
    const { projectTask } = this.props;
    let priorityColor = "";
    switch (projectTask.priority) {
      case 1:
        priorityColor = "primary";
        break;
      case 2:
        priorityColor = "warning";
        break;
      case 3:
        priorityColor = "danger";
        break;
      default:
        break;
    }
    return (
      <div className="project-task">
        <div className="card border-secondary">
          <div
            className={classnames("card-header", `bg-${priorityColor}`)}
          ></div>
          <div className="card-body" style={{ height: "12ex" }}>
            <h5 className="card-title">{projectTask.summary}</h5>
            <p className="card-text">{projectTask.acceptanceCriteria}</p>
          </div>
          <div className="card-body mt-1">
            <Link
              to={`/updateProjectTask/${projectTask.projectId}/${projectTask.taskSequence}`}
            >
              <i className="btn btn-light border-secondary">View/Update</i>
            </Link>
            <a href="." onClick={this.handleClick}>
              <i className="btn btn-secondary ml-1">Delete</i>
            </a>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

ProjectTaskItem.propTypes = {
  deleteTask: PropTypes.func.isRequired
};

export default connect(null, { deleteTask })(ProjectTaskItem);

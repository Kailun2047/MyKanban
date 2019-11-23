import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectTaskItem from "./ProjectTaskItem";
import { connect } from "react-redux";
import { getProjectTaskByProjectId } from "../../actions/projectTaskActions";
import PropTypes from "prop-types";

class ProjectBoard extends Component {
  componentDidMount() {
    const { projectId } = this.props.match.params;
    this.props.getProjectTaskByProjectId(projectId);
  }

  render() {
    const { projectId } = this.props.match.params;
    const { tasks } = this.props.projectTasksResp;
    const toDoList = [],
      inProgressList = [],
      testingList = [],
      completedList = [];
    tasks.forEach(t => {
      switch (t.status) {
        case "To Do":
          toDoList.push(t);
          break;
        case "In Progress":
          inProgressList.push(t);
          break;
        case "Testing":
          testingList.push(t);
          break;
        case "Completed":
          completedList.push(t);
          break;
        default:
          break;
      }
    });
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
              <hr />
              {toDoList.map(t => (
                <ProjectTaskItem key={t.id} projectTask={t} />
              ))}
            </div>
            <div className="col-md">
              <div className="card bg-light">
                <div className="card-header text-center text-secondary h4">
                  <i className="fas fa-tasks"> In Progress</i>
                </div>
              </div>
              <hr />
              {inProgressList.map(t => (
                <ProjectTaskItem key={t.id} projectTask={t} />
              ))}
            </div>
            <div className="col-md">
              <div className="card bg-light">
                <div className="card-header text-center text-secondary h4">
                  <i className="fas fa-vial"> Testing</i>
                </div>
              </div>
              <hr />
              {testingList.map(t => (
                <ProjectTaskItem key={t.id} projectTask={t} />
              ))}
            </div>
            <div className="col-md">
              <div className="card bg-light">
                <div className="card-header text-center text-secondary h4">
                  <i className="fas fa-check-double"> Completed</i>
                </div>
              </div>
              <hr />
              {completedList.map(t => (
                <ProjectTaskItem key={t.id} projectTask={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  projectTasksResp: PropTypes.object.isRequired,
  getProjectTaskByProjectId: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    projectTasksResp: state.projectTasksResp
  };
};

export default connect(mapStateToProps, { getProjectTaskByProjectId })(
  ProjectBoard
);

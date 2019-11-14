import React, { Component } from "react";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";
import ProjectItem from "./Project/ProjectItem";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  componentWillReceiveProps(newProp) {
    if (newProp.projectResp) {
      this.props.projectResp = newProp.projectResp;
    }
  }

  render() {
    const { projects } = this.props.projectsResp;

    return (
      <div className="projects">
        {/* Dashboard */}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h1 className="text-center">Projects Dashboard</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {/* Project items */}
              {projects.map(p => (
                <ProjectItem key={p.id} project={p} />
              ))}
              {/* End of project items */}
            </div>
          </div>
        </div>
        {/* End of dashboard */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  projectsResp: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { projectsResp: state.projectsResp };
};

export default connect(mapStateToProps, { getProjects })(Dashboard);

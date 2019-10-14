import React, { Component } from "react";
import CreateProjectButton from "./Project/CreateProjectButton";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="projects">
        {/* Dashboard */}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h1 className="text-center">Project Board</h1>
              <br />
              <CreateProjectButton />

              <br />
              <hr />

              {/* Project items */}
              <div className="container">
                <div className="card card-body bg-light">
                  <div className="row">
                    <div className="col-2">
                      <span className="mx-auto">PROJ1</span>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                      <h3>Spring/React project</h3>
                      <p>Test project item</p>
                    </div>
                    <div className="col-md-4 d-none d-lg-block">
                      <ul className="list-group list-group-mine">
                        <a href="#">
                          <li className="list-group-item board">
                            <i className="far fa-file-code"> Project Board</i>
                          </li>
                        </a>
                        <a href="#">
                          <li className="list-group-item update">
                            <i className="far fa-edit">Update Project</i>
                          </li>
                        </a>
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
              {/* End of project item */}
            </div>
          </div>
        </div>
        {/* End of dashboard */}
      </div>
    );
  }
}

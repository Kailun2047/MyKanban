import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Layouts/Header";
import Dashboard from "./components/Dashboard";
import AddProject from "./components/Project/AddProject";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectTask/ProjectBoard";
import AddProjectTask from "./components/ProjectTask/AddProjectTask";
import UpdateProjectTask from "./components/ProjectTask/UpdateProjectTask";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route
              exact
              path="/updateProject/:projectId"
              component={UpdateProject}
            />
            <Route
              exact
              path="/projectBoard/:projectId"
              component={ProjectBoard}
            />
            <Route
              exact
              path="/addProjectTask/:projectId"
              component={AddProjectTask}
            />
            <Route
              exact
              path="/updateProjectTask/:projectId"
              component={UpdateProjectTask}
            />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

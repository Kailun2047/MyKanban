import React from "react";
import { Link } from "react-router-dom";

export default function CreateProjectButton(props) {
  return (
    <React.Fragment>
      <Link to="/addProject" className="btn btn-lg btn-secondary">
        Create Project
      </Link>
    </React.Fragment>
  );
}

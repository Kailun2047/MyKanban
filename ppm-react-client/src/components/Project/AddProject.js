import React, { Component } from "react";

export default class AddProject extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }*/

  render() {
    return (
      <div className="create">
        <div className="container">
          <div className="row">
            <div className="col-mid-8 m-auto">
              <br />
              <h5 className="text-center">Create a Project</h5>
              <hr />
              <form>
                <div className="from-group">
                  <input
                    type="text"
                    name="projectname"
                    className="form-control"
                    placeholder="Unique Project name"
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Unique Project ID"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="description"
                    rows="1"
                    placeholder="Brief Description"
                  ></textarea>
                </div>
                <h6>Start Date:</h6>
                <div className="form-group">
                  <input type="date" className="form-control" />
                </div>
                <h6>Estimated End Date:</h6>
                <div className="form-group">
                  <input type="date" className="form-control" />
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-lg btn-secondary"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

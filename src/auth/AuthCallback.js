import React, { Component } from "react";
import PropTypes from "prop-types";
import { Loader } from "@ndustrial/nd-react-common";

export default class AuthCalback extends Component {
  static propTypes = {
    label: PropTypes.string
  };

  render() {
    return (
      <div className="auth-callback">
        <Loader label={this.props.label} />
      </div>
    );
  }
}

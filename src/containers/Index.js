import React, { Component } from "react";
import Index from "../components/Index";
import contxtService from "../services/contxt.js";
import { uniq } from "underscore";

class IndexContainer extends Component {
  componentDidMount() {
    return contxtService.facilities.getAll().then(facilities => {
      console.log(
        "%c ---- Sample facilities request loaded with the SDK ---- ",
        "background: green; color: white"
      );
      console.table(facilities);
      return facilities;
    });
  }

  render() {
    return <Index />;
  }
}

export default IndexContainer;

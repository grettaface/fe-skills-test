import React, { Component } from "react";
import Index from "../components/Index";
import contxtService from "../services/contxt.js";

class IndexContainer extends Component {
  constructor() {
    super();
    this.state = {
      facilities: [],
      filteredFacilities: [],
      organizations: []
    };
  }
  onOrgChange = org => {
    let filteredFacilities = this.state.facilities.filter(
      facility => facility.organization.id === org.id
    );
    this.setState({ filteredFacilities });
  };
  componentDidMount() {
    return contxtService.facilities.getAll().then(facilities => {
      let organizations = contxtService.organizations.getUniques(facilities);
      this.setState({
        facilities,
        filteredFacilities: facilities,
        organizations
      });
    });
  }
  render() {
    return this.state.facilities.length > 0 ? (
      <Index
        facilities={this.state.filteredFacilities}
        organizations={this.state.organizations}
        onOrgChange={this.onOrgChange}
      />
    ) : (
      "... Loading"
    );
  }
}

export default IndexContainer;

import React, { Component } from "react";
import Index from "../components/Index";
import contxtService from "../services/contxt.js";
import orgService from "../services/orgs";
class IndexContainer extends Component {
  state = {
    facilities: [],
    organizations: [],
    filteredFacilities: [],
    selectedOrg: {}
  };
  componentDidMount() {
    return contxtService.facilities.getAll().then(facilities => {
      const organizations = orgService.unique(facilities);
      this.setState({ facilities, organizations });
    });
  }
  _onOrgChange = org => {
    const facilitiesWithOrg = this.state.facilities.filter(facility => {
      return facility.organization.id === org.id;
    });
    this.setState({
      filteredFacilities: facilitiesWithOrg,
      selectedOrg: org
    });
  };
  render() {
    return (
      <Index
        facilities={this.state.facilities}
        organizations={this.state.organizations}
        onOrgChange={this._onOrgChange}
        selectedOrg={this.selectedOrg}
        filteredFacilities={this.state.filteredFacilities}
      />
    );
  }
}

export default IndexContainer;

import React, { Component } from "react";
import Index from "../components/Index";
import contxtService from "../services/contxt.js";
import { uniq } from "underscore";

class IndexContainer extends Component {
  state = {
    facilities: [],
    filteredData: [],
    organizations: [],
    selectedOrganization: {}
  };

  componentDidMount() {
    return contxtService.facilities.getAll().then(facilities => {
      const organizations = this.uniqueOrgs(facilities);

      // The facility label reflects a different org than facility.org.label
      // For example the one labeled "Facility 2 - Org 3" has an associated Org 2...?
      console.log(facilities);

      this.setState({
        facilities,
        organizations
      });

      return facilities;
    });
  }

  // Filter by org id and update filtered data and selectedOrganization
  onFilter = org => {
    const facilityByOrg = this.state.facilities.filter(facility => {
      return facility.organization.id === org.id;
    });

    this.setState({
      filteredData: facilityByOrg,
      selectedOrganization: org
    });
  };

  // Filter out unique organizations.
  // map to label since it's needed by the dropdown. Thanks Chrome DevTools!
  uniqueOrgs(facilities) {
    return uniq(
      facilities.map(({ organization }) => {
        organization.label = organization.name;
        return organization;
      }),
      function(organization) {
        return organization.id;
      }
    );
  }

  render() {
    return (
      <Index
        facilities={this.state.facilities}
        filteredData={this.state.filteredData}
        organizations={this.state.organizations}
        onFilter={this.onFilter}
        selectedOrganization={this.selectedOrganization}
      />
    );
  }
}

export default IndexContainer;

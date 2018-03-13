import React from 'react';
import contxtSDK from '../../services/ContxtService.js';
import { Dropdown, List } from '@ndustrial/nd-react-common';
import { find } from 'lodash';

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {
      facilities: [],
      organizations: [],
      filteredFacilities: []
    };

    this.filterFacilities = this.filterFacilities.bind(this);
    this.organizationSelected = this.organizationSelected.bind(this);
  }

  componentDidMount() {
    let facilities = [];
    let organizations = [];

    contxtSDK.facilities.getAll().then((res) => {
      // Alter facilities
      res.forEach(function(facility) {
        facilities.push({
          id: facility.id,
          label: facility.name,
          Organization: facility.Organization
        });
        // Generate unique organizations
        if (!find(organizations, {id: facility.Organization.id})) {
          organizations.push({
            id: facility.Organization.id,
            label: facility.Organization.name
          });
        }
      });
      this.setState({facilities, filteredFacilities: this.filterFacilities(facilities, organizations[0]), organizations});
    });
  }

  organizationSelected(org) {
    this.setState({filteredFacilities: this.filterFacilities(this.state.facilities, org)});
  }

  filterFacilities(facilities, org) {
    return facilities.filter(function(facility) {
      return facility.Organization.id === org.id;
    });
  }

  renderOrganizations() {
    if (this.state.organizations.length) {
      return <div className="organizations-selector"><Dropdown callback={this.organizationSelected} name="Organizations" data={this.state.organizations}/></div>;
    }
  }

  renderFacilities() {
    if (this.state.facilities.length) {
      return <div className="facilities-selector"><List name="Facilities" data={this.state.filteredFacilities}/></div>;
    }
  }

  render() {
    return (
      <div className="main">
        <div className="welcome-title">Welcome to the skills test!</div>
        <div className="welcome-description">There are no right or wrong answers and no traps set, this is just meant to see how you approach a problem. Do what you think is best and feel free to ask questions</div>
        {/* Main Content */}
        <div className="main-content">
          {this.renderOrganizations()}
          {this.renderFacilities()}
        </div>
      </div>
    );
  }
}

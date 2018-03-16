import React from 'react';
import contxtSDK from '../../services/ContxtService.js';
import { Dropdown, List } from '@ndustrial/nd-react-common';
import { uniqBy } from 'lodash';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facilities: [],
      organizations: [],
      filteredFacilities: [],
      selectedOrganization: []
    }
    this.handleOrgChange = this.handleOrgChange.bind(this);
  }

  componentDidMount() {
    contxtSDK.facilities.getAll().then((res) => {

      const facilities = res.map((facility) => {
        return { id: facility.id, label:facility.name, organization_id: facility.organization_id }
      });

      let organizations = res.map((facility) => {
        return { id: facility.Organization.id, label: facility.Organization.name }
      });

      organizations = uniqBy(organizations, "id");

      let selectedOrganization = organizations[2];

      let filteredFacilities = facilities.filter(function(facility) {
        return selectedOrganization.id === facility.organization_id
      });

      this.setState({facilities, organizations, selectedOrganization, filteredFacilities});
    });
  }



  handleOrgChange(org) {
    let filteredFacilities = this.state.facilities.filter(function(facility) {
      return org.id === facility.organization_id
    });
    this.setState({
      selectedOrganization: org,
      filteredFacilities});
  }



  render() {
    var divContainer = {
      display: 'block'
    }

    var divOrganizations = {
      width: '50%',
    }

    var divFacilities = {
      padding: '10px 0 0 0',
    }

    return (
      <div className="main">
        <div className="welcome-title">Welcome to the skills test!</div>
        <div className="welcome-description">There are no right or wrong answers and no traps set, this is just meant to see how you approach a problem. Do what you think is best and feel free to ask questions</div>
        {/* Main Content */}
        <div className="main-content" style={divContainer}>
          <div style={divOrganizations}>
            <Dropdown
              data={this.state.organizations}
              name={"Organizations"}
              callback={this.handleOrgChange}
            />
          </div>
          <div style={divFacilities}>
            <List
              data={this.state.filteredFacilities}
            />
          </div>
        </div>
      </div>
    );
  }
}

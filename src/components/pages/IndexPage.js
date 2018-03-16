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
      filteredOrganizations: [],
      selectedOrganization: ""
    }
    this.handleOrgChange = this.handleOrgChange.bind(this);
  }

  componentWillMount() {
    contxtSDK.facilities.getAll().then((res) => {
      // console.log('%c ---- Sample facilities request loaded with the SDK ---- ', 'background: green; color: white');
      // console.table(res);

      const facilities = res.map((facility) => {
        return { id: facility.id, label:facility.name, organization_id: facility.organization_id }
      });

      let organizations = res.map((facility) => {
        return { id: facility.Organization.id, label: facility.Organization.name }
      });

      organizations = uniqBy(organizations, "id");

      let selectedOrganization = organizations[2];

      let filteredOrganizations = facilities.filter(function(facility) {
        return selectedOrganization.id === facility.organization_id
      });

      this.setState({facilities, organizations, selectedOrganization, filteredOrganizations});
    });
  }



  handleOrgChange(value) {
    let filteredOrganizations = this.state.facilities.filter(function(facility) {
      return value.id === facility.organization_id
    });
    this.setState({
      selectedOrganization: value,
      filteredOrganizations});
  }



  render() {
    var divContainer = {
      display: 'block'
    }

    var divOrganizations = {
      width: '50%',
    }

    var divFacilities = {
      position: 'relative',
      width: '100%',
      clear:  'left',
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
              value={this.state.organizations.name}
              callback={this.handleOrgChange}
            />
          </div>
          <div style={divFacilities}>
            <List
              data={this.state.filteredOrganizations}
            />
          </div>
        </div>
      </div>
    );
  }
}

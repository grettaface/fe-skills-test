import React from 'react';
import contxtSDK from '../../services/ContxtService.js';
import { Dropdown, List } from '@ndustrial/nd-react-common';
import { find } from 'lodash';

export default class IndexPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    contxtSDK.facilities.getAll().then((res) => {
      console.log('%c ---- Sample facilities request loaded with the SDK ---- ', 'background: green; color: white');
      console.table(res);
    });
  }

  renderOrganizations() {
    // Render organizations here
    // required props are {data} and data requires each item to have an id and label
  }

  renderFacilities() {
    // Render facilities here with <List/>
    // required props are {data} and data requires each item to have an id and label
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

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// eslint-disable-next-line no-unused-vars
import JSDOM from '../../../test/helpers/jsdomHelper';
import contxtSDK from '../../services/ContxtService';

import facilities from '../../../test/fixtures/facilities.json';

import IndexPage from './IndexPage';

describe('IndexPage', function() {
  let wrapper;
  let sandbox;
  const sampleOrg = {
    id: '59270c25-4de9-4b22-8e0b-ab287ac344ce',
    name: 'Novozymes',
    created_at: '2018-03-07T00:09:53.019Z',
    updated_at: '2018-03-07T00:09:53.019Z'
  };

  before(function() {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(function() {
    sandbox.stub(contxtSDK.facilities, 'getAll').resolves(facilities);
    wrapper = mount(<IndexPage />);
  });

  afterEach(function() {
    sandbox.restore();
  });

  // --------- Fill in below ---------- //

  it('should render', function() {
    expect(wrapper).to.not.be.empty;
  });

  describe('constructor', function() {
    it('should properly set my starting state', function() {
      expect(wrapper.state('facilities').length).to.be.gt(109);
    });
  });

  describe('componentDidMount', function() {
    it('should properly set the state for organizations', function() {
      expect(wrapper.state('organizations').length).to.be.gt(2);
    });
    it('should properly set the state for facilities', function() {
    expect(wrapper.state('facilities').length).to.be.gt(109);
    });
    it('should properly set the state for organization selected', function() {
      expect(wrapper.state('selectedOrganization').label).to.equal('Novozymes');
    });
  });

  describe('organization selected', function() {
    it('should properly set the state for selectedOrganization', function() {
      let selectedOrgData = {id: "02efa741-a96f-4124-a463-ae13a704b8fc", label: "Lineage Logistics"}

      let selectedOrg = "Lineage Logistics"

      let defaultOrg = "Novozymes"
      expect(wrapper.state('selectedOrganization').label).to.be.equal(defaultOrg);
      expect(wrapper.instance().handleOrgChange(selectedOrgData));
      expect(wrapper.state('selectedOrganization').label).to.be.equal(selectedOrg);
    });


    it('should properly set the state for filteredFacilities', function() {
      let orgData = {id: "02efa741-a96f-4124-a463-ae13a704b8fc", label: "Lineage Logistics"}

      expect(wrapper.state('filteredFacilities').length).to.be.equal(1);
      expect(wrapper.instance().handleOrgChange(orgData));
      expect(wrapper.state('filteredFacilities').length).to.be.gt(107);
    });
  });

  describe('facility filtering', function() {
    it('should properly filter the facilities based on an org', function() {
      expect(wrapper.state('facilities')).to.not.equal(wrapper.state('filteredFacilities'))
    });
  });
});

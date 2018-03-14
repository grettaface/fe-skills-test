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

  it('should render', function() {
    expect(wrapper).to.not.be.empty;
  });

  describe('constructor', function() {
    it('should properly set my starting state', function() {
      const {facilities, organizations, filteredFacilities} = wrapper.state();
      expect(facilities).to.not.be.undefined;
      expect(organizations).to.not.be.undefined;
      expect(filteredFacilities).to.not.be.undefined;
    });
  });

  describe('componentDidMount', function() {
    it('should properly set the state for facilities and organizations', function() {
      wrapper.update();
      const {facilities, organizations} = wrapper.state();
      expect(facilities.length).to.equal(facilities.length);
      expect(organizations.length).to.be.above(0);
    });
  });

  describe('organization selected', function() {
    it('should properly set the state for facilities and organizations', function() {
      const facilityCache = wrapper.state().filteredFacilities;
      wrapper.instance().organizationSelected(sampleOrg);
      wrapper.update();
      expect(wrapper.state().filteredFacilities).to.not.equal(facilityCache);
    });
  });

  describe('facility filtering', function() {
    it('should properly filter the facilities based on an org', function() {
      expect(wrapper.instance().filterFacilities(facilities, sampleOrg).length)
        .to.be.below(facilities.length);
    });
  });
});

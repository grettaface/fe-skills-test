import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import JSDOM from '../../../test/helpers/jsdomHelper';

import IndexPage from './IndexPage';

describe('IndexPage', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<IndexPage />);
  });

  it('should render', function() {
    expect(wrapper).to.not.be.empty;
  });

  it('should properly show a facilities list', function() {

  });

  it('should properly show an organization dropdown', function() {

  });

  it('should properly update the facilities list when choosing a new organization', function() {

  });
});

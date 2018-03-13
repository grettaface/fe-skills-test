import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', function() {
  it('should render', function() {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).to.not.be.empty;
  });
});

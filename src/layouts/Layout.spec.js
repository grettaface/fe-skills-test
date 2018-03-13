import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import faker from 'faker';
import { MemoryRouter } from 'react-router-dom';
import { sandbox } from 'sinon';

import { Header } from '@ndustrial/nd-react-common';
import IndexPage from '../../src/components/pages/IndexPage';
import NotFoundPage from '../../src/components/pages/NotFoundPage';
import Layout from '../../src/layouts/Layout';

describe('<Layout/>', function() {
  let baseAuth;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    baseAuth = {
      getProfile: this.sandbox.stub().resolves({}),
      isAuthenticated: this.sandbox.stub(),
      logOut: this.sandbox.stub()
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let layout;

    beforeEach(function() {
      layout = shallow(<Layout auth={baseAuth} />);
    });

    it('binds a copy of logout to the instance', function() {
      expect(layout.instance().auth.logout.name).to.equal('bound logOut');
    });

    it("sets an initial empty profile to the component's state", function() {
      expect(layout.state('profile')).deep.to.equal({});
    });
  });

  describe('componentDidMount', function() {
    context('when the user is authenticated', function() {
      let auth;
      let expectedState;
      let layout;
      let promise;

      beforeEach(function() {
        expectedState = {
          profile: {
            profileImage: faker.image.avatar(),
            userName: faker.name.firstName()
          }
        };

        auth = {
          ...baseAuth,
          getProfile: this.sandbox.stub().resolves({
            nickname: expectedState.profile.userName,
            picture: expectedState.profile.profileImage
          }),
          isAuthenticated: this.sandbox.stub().returns(true)
        };

        layout = shallow(
          <Layout auth={auth} />,
          { disableLifecycleMethods: true }
        );

        promise = layout.instance().componentDidMount();
      });

      it('checks if the user is authenticated', function() {
        expect(auth.isAuthenticated.calledOnce).to.be.true;
      });

      it("gets the user's profile", function() {
        expect(auth.getProfile.called).to.be.true;
      });

      it("sets the user's profile information to the component's state", function() {
        return promise.then(() => {
          expect(layout.state()).to.deep.equal(expectedState);
        });
      });
    });

    context('when the user is not authenticated', function() {
      let auth;

      beforeEach(function() {
        auth = {
          ...baseAuth,
          isAuthenticated: this.sandbox.stub().returns(false)
        };

        const layout = shallow(
          <Layout auth={auth} />,
          { disableLifecycleMethods: true }
        );
        layout.instance().componentDidMount();
      });

      it("does not get the user's profile", function() {
        expect(auth.getProfile.called).to.be.false;
      });
    });
  });

  describe('logOut', function() {
    beforeEach(function() {
      const layout = shallow(<Layout auth={baseAuth} />);
      layout.instance().logOut();
    });

    it('starts the log out process', function() {
      expect(baseAuth.logOut.calledOnce).to.be.true;
    });
  });

  describe('render', function() {
    it('should render', () => {
      const wrapper = shallow(<Layout auth={baseAuth} />);
      expect(wrapper).to.not.be.empty;
    });

    it('should include header', function() {
      const wrapper = shallow(<Layout auth={baseAuth} />);
      expect(wrapper.find(Header).exists()).to.be.true;
    });

    it('should include <IndexPage/> on home route', function() {
      const wrapper = mount(
        <MemoryRouter initialEntries={[ '/' ]}>
          <Layout auth={baseAuth} />
        </MemoryRouter>
      );
      expect(wrapper.find(IndexPage).exists()).to.be.true;
    });

    it('should include <NotFoundPage/> on bad route', function() {
      const wrapper = mount(
        <MemoryRouter initialEntries={[ '/404' ]}>
          <Layout auth={baseAuth} />
        </MemoryRouter>
      );
      expect(wrapper.find(NotFoundPage).exists()).to.be.true;
    });
  });
});

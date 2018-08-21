import { mount } from "enzyme";
import { Header } from "@ndustrial/nd-react-common";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../../src/components/NotFound";
import IndexContainer from "../../src/containers/Index";
import Layout from "./Layout";
import contxtService from "../services/contxt";

describe("layouts/Layout", function() {
  let baseProps;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    baseProps = {
      auth: {
        getProfile: this.sandbox.stub().resolves({}),
        isAuthenticated: this.sandbox.stub(),
        logOut: this.sandbox.stub()
      }
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe("constructor", function() {
    let layout;

    beforeEach(function() {
      layout = shallow(<Layout {...baseProps} />);
    });

    it("binds a copy of logout to the instance", function() {
      expect(layout.instance().auth.logout.name).to.equal("bound logOut");
    });

    it("sets an initial empty profile to the component's state", function() {
      expect(layout.state("profile")).deep.to.equal({});
    });
  });

  describe("componentDidMount", function() {
    context("when the user is authenticated", function() {
      let expectedState;
      let layout;
      let promise;
      let props;

      beforeEach(function() {
        expectedState = {
          profile: {
            profileImage: faker.image.avatar(),
            userName: faker.name.firstName()
          }
        };

        props = {
          ...baseProps,
          auth: {
            ...baseProps.auth,
            getProfile: this.sandbox.stub().resolves({
              nickname: expectedState.profile.userName,
              picture: expectedState.profile.profileImage
            }),
            isAuthenticated: this.sandbox.stub().returns(true)
          }
        };

        layout = shallow(<Layout {...props} />, {
          disableLifecycleMethods: true
        });

        promise = layout.instance().componentDidMount();
      });

      it("checks if the user is authenticated", function() {
        expect(props.auth.isAuthenticated.calledOnce).to.be.true;
      });

      it("gets the user's profile", function() {
        expect(props.auth.getProfile.called).to.be.true;
      });

      it("sets the user's profile information to the component's state", function() {
        return promise.then(() => {
          expect(layout.state()).to.deep.equal(expectedState);
        });
      });
    });

    context("when the user is not authenticated", function() {
      let props;

      beforeEach(function() {
        props = {
          ...baseProps,
          auth: {
            ...baseProps.auth,
            isAuthenticated: this.sandbox.stub().returns(false)
          }
        };

        const layout = shallow(<Layout {...props} />, {
          disableLifecycleMethods: true
        });
        layout.instance().componentDidMount();
      });

      it("does not get the user's profile", function() {
        expect(props.auth.getProfile.called).to.be.false;
      });
    });
  });

  describe("logOut", function() {
    beforeEach(function() {
      const layout = shallow(<Layout {...baseProps} />);
      layout.instance().logOut();
    });

    it("starts the log out process", function() {
      expect(baseProps.auth.logOut.calledOnce).to.be.true;
    });
  });

  describe("render", function() {
    beforeEach(function() {
      this.sandbox.stub(contxtService.facilities, "getAll").resolves([]);
    });

    it("should include header", function() {
      const layout = shallow(<Layout {...baseProps} />);
      const header = layout.find(Header);

      expect(header.exists()).to.be.true;
    });

    [
      {
        title: "IndexContainer",
        url: `/`,
        component: IndexContainer
      },
      {
        title: "NotFound",
        url: `/404`,
        component: NotFound
      }
    ].forEach(function(route) {
      describe(route.title, function() {
        it(`should include <${
          route.title
        }/> on ${route.url} route`, function() {
          const layout = mount(
            <MemoryRouter initialEntries={[route.url]}>
              <Layout {...baseProps} />
            </MemoryRouter>
          );
          const component = layout.find(route.component);

          expect(component.exists()).to.be.true;
        });
      });
    });

    it("should include <IndexContainer /> on the home route", function() {
      const layout = mount(
        <MemoryRouter initialEntries={["/"]}>
          <Layout {...baseProps} />
        </MemoryRouter>
      );
      const index = layout.find(IndexContainer);

      expect(index.exists()).to.be.true;
    });

    it("should include <NotFound /> on a non-existent route", function() {
      const layout = mount(
        <MemoryRouter initialEntries={["/404"]}>
          <Layout {...baseProps} />
        </MemoryRouter>
      );
      const notFound = layout.find(NotFound);

      expect(notFound.exists()).to.be.true;
    });
  });
});

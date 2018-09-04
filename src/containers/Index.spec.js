import React from "react";
import Index from "./Index";
import contxtService from "../services/contxt";
import orgService from "../services/orgs";

describe("containers/Index", function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe("componentDidMount", function() {
    let expectedFacilities;
    let getAll;
    let promise;
    let index;
    let expectedState;

    beforeEach(function() {
      expectedFacilities = fixture.buildList(
        "facility",
        faker.random.number({ min: 1, max: 10 })
      );

      expectedState = {
        facilities: expectedFacilities,
        organizations: orgService.unique(expectedFacilities),
        filteredFacilities: [],
        selectedOrg: {}
      };

      getAll = this.sandbox
        .stub(contxtService.facilities, "getAll")
        .resolves(expectedFacilities);

      index = shallow(<Index />, { disableLifecycleMethods: true });
      promise = index.instance().componentDidMount();
    });

    it("gets a list of facilities", function() {
      expect(getAll).to.be.calledOnce;
    });

    it("sets the state for facilities and organizations", function() {
      return promise.then(() => {
        expect(index.state()).to.deep.equal(expectedState);
      });
    });

    it("should set the state to contain at least one facility", function() {
      return promise.then(() => {
        expect(index.state("facilities").length).to.be.gte(1);
      });
    });

    it("should set the state to contain at least one organization", function() {
      return promise.then(() => {
        expect(index.state("organizations").length).to.be.gte(1);
      });
    });
  });

  describe("On Organization Change", function() {
    let index;
    let expectedFacilities;
    let baseState;
    beforeEach(function() {
      expectedFacilities = fixture.buildList(
        "facility",
        faker.random.number({ min: 1, max: 10 })
      );

      baseState = {
        facilities: expectedFacilities,
        organizations: orgService.unique(expectedFacilities),
        filteredFacilities: [],
        selectedOrg: {}
      };

      index = shallow(<Index />, { disableLifecycleMethods: true });
    });

    it("should set a selected organization", function() {
      const orgChoice = baseState.organizations[0];
      index.instance()._onOrgChange(orgChoice);
      expect(index.state("selectedOrg")).to.deep.equal(orgChoice);
    });

    it("should filter facilities", function() {
      const orgChoice = baseState.organizations[0];
      index.instance()._onOrgChange(orgChoice);
      expect(index.state("facilities")).to.not.equal(
        index.state("filteredFacilities")
      );
    });
  });
});

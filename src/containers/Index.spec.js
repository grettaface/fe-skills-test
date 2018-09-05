import React from "react";
import Index from "./Index";
import contxtService from "../services/contxt";

describe("containers/Index", function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();

    // TODO: Remove me when doing anything in this app.
    this.sandbox.stub(console, "log");
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe("componentDidMount", function() {
    let expectedFacilities;
    let getAll;
    let index;
    let promise;

    beforeEach(function() {
      expectedFacilities = fixture.buildList(
        "facility",
        faker.random.number({ min: 1, max: 10 })
      );
      getAll = this.sandbox
        .stub(contxtService.facilities, "getAll")
        .resolves(expectedFacilities);

      const index = shallow(<Index />, { disableLifecycleMethods: true });
      promise = index.instance().componentDidMount();
    });

    it("gets a list of facilities", function() {
      expect(getAll).to.be.calledOnce;
    });

    it("returns the list of facilities", function() {
      return expect(promise).to.be.fulfilled.and.to.eventually.equal(
        expectedFacilities
      );
    });
  });
});

describe("facility filtering", function() {
  let expectedFacilities;
  let index;

  beforeEach(function() {
    expectedFacilities = fixture.buildList(
      "facility",
      faker.random.number({ min: 1, max: 10 })
    );

    index = shallow(<Index />, { disableLifecycleMethods: true });
  });

  it("should set a selected organization", function() {
    const selOrg = index.instance().uniqueOrgs(expectedFacilities)[2];
    index.instance().onFilter(selOrg);
    expect(index.state("selectedOrganization")).to.deep.equal(selOrg);
  });

  it("should filter facilities based on selected org", function() {
    const selOrg = index.instance().uniqueOrgs(expectedFacilities)[2];
    index.instance().onFilter(selOrg);
    expect(index.state("facilities")).to.not.equal(index.state("filteredData"));
  });
});

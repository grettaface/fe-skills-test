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

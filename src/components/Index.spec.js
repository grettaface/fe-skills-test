import React from "react";
import Index from "./Index";
import { List, Dropdown } from "@ndustrial/nd-react-common";

describe("components/Index", function() {
  let baseProps;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    const facilities = fixture.buildList(
      "facility",
      faker.random.number({ min: 1, max: 10 })
    );
    const organizations = fixture.buildList(
      "organization",
      faker.random.number({ min: 1, max: 10 })
    );
    baseProps = {
      facilities,
      organizations,
      onOrgChange: this.sandbox.stub()
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe("render", function() {
    let index;

    beforeEach(function() {
      index = shallow(<Index {...baseProps} />);
    });

    it("should include dropdown", function() {
      const dropdown = index.find(Dropdown);
      expect(dropdown.exists()).to.be.true;
    });

    it("should include a list", function() {
      const list = index.find(List);
      expect(list.exists()).to.be.true;
    });
  });
});

import React from "react";
import Index from "./Index";
import { List, Dropdown } from "@ndustrial/nd-react-common";
import contxtService from "../services/contxt";

describe("components/Index", function() {
  let initialProps;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    const facilities = fixture.buildList(
      "facility",
      faker.random.number({ min: 1, max: 10 })
    );
    const organizations = contxtService.organizations.getUniques(facilities);

    initialProps = {
      facilities,
      organizations,
      onOrgChange: this.sandbox.stub()
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe("return", function() {
    let indexWrapper;

    beforeEach(function() {
      indexWrapper = shallow(<Index {...initialProps} />);
    });

    it("should include dropdown with initial props", function() {
      let dropdown = indexWrapper.find(Dropdown);
      expect(dropdown.exists()).to.be.true;
      expect(dropdown.props().hasOwnProperty("data")).to.be.true;
      expect(dropdown.prop("data")).to.deep.equal(initialProps.organizations);
      expect(dropdown.props().hasOwnProperty("callback")).to.be.true;
      expect(dropdown.prop("callback")).to.deep.equal(initialProps.onOrgChange);
    });
    it("should include a list", function() {
      const list = indexWrapper.find(List);
      expect(list.exists()).to.be.true;
      expect(list.props().hasOwnProperty("data")).to.be.true;
      expect(list.prop("data")).to.deep.equal(initialProps.facilities);
    });
  });
});

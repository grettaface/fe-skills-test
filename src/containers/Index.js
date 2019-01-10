import React, { Component } from "react";
import Index from "../components/Index";
import contxtService from "../services/contxt.js";
import { find } from "underscore";

class IndexContainer extends Component {
  constructor() {
    super();
    this.state = {
      facilities: null,
      filteredFacilities: null,
      organizations: null
    };
  }

  onChange = event => {
    console.log("REMOVE event.value", event.value);
    let filteredFacilities = this.state.facilities.filter(facility => {
      return facility.organization.id === event.value;
    });

    this.setState({ filteredFacilities }, () => {
      console.log(
        "REMOVE! this.state.filteredFacilities",
        this.state.filteredFacilities
      );
    });
  };

  componentDidMount() {
    return contxtService.facilities.getAll().then(facilities => {
      console.log(
        "%c ---- Sample facilities request loaded with the SDK ---- ",
        "background: green; color: white"
      );
      console.table(facilities);

      let allOrgs = [];

      for (let facility of facilities) {
        console.log("REMOVE! facility", facility.organization);
        allOrgs.push(facility.organization);
      }

      let organizations = [];

      for (let org of allOrgs) {
        if (
          !find(organizations, x => {
            return x.id === org.id;
          })
        ) {
          organizations.push({ id: org.id, label: org.name, value: org.id });
        }
      }

      this.setState(
        { facilities, organizations, filteredFacilities: facilities },
        () => {
          return facilities;
        }
      );
    });
  }

  render() {
    return this.state.facilities ? (
      <Index
        facilities={this.state.filteredFacilities}
        organizations={this.state.organizations}
        onChange={this.onChange}
      />
    ) : (
      "... Loading"
    );
  }
}

export default IndexContainer;

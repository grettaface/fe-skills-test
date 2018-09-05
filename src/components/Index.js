import React from "react";
import { List, Dropdown } from "@ndustrial/nd-react-common";
import { PropTypes } from "prop-types";

function Index({
  facilities,
  organizations,
  onFilter,
  filteredData,
  selectedOrganization
}) {
  return (
    <div className="main">
      <div className="app-information__title">Welcome to the skills test!</div>
      <div className="app-information__description">
        There are no right or wrong answers and no traps set, this is just meant
        to see how you approach a problem. Do what you think is best and feel
        free to ask questions
      </div>
      {/* Main Content */}
      <div className="main-content">
        {/* Org dropdown with callback for filtering */}
        <Dropdown
          data={organizations}
          callback={onFilter}
          selectedItem={selectedOrganization}
          name="Select an Organization"
        />

        {/* Facility list which gets filtered on org change */}
        <List data={filteredData.length > 0 ? filteredData : facilities} />
      </div>
    </div>
  );
}

// This is where my react knowledge is still in development.
// What is the best practice here? I needed to define types or it failed prop validation.

Index.propTypes = {
  facilities: PropTypes.any,
  organizations: PropTypes.any,
  onFilter: PropTypes.func,
  filteredData: PropTypes.any,
  selectedOrganization: PropTypes.any
};

export default Index;

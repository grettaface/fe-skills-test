import React from "react";
import { List, Dropdown } from "@ndustrial/nd-react-common";
import PropTypes from "prop-types";

function Index({
  facilities,
  organizations,
  onOrgChange,
  filteredFacilities,
  selectedOrg
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
        <Dropdown
          data={organizations}
          callback={onOrgChange}
          selectedItem={selectedOrg}
          name="Select an Organization"
          className="organizations-selector"
        />
        <List
          className="facilities-selector"
          data={
            filteredFacilities && filteredFacilities.length > 0
              ? filteredFacilities
              : facilities
          }
        />
      </div>
    </div>
  );
}

Index.propTypes = {
  onOrgChange: PropTypes.func.isRequired,
  selectedOrg: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    value: PropTypes.any
  }),
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.any.isRequired,
      value: PropTypes.any
    })
  ).isRequired,
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.any.isRequired,
      value: PropTypes.any
    })
  ).isRequired,
  filteredFacilities: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.any.isRequired,
      value: PropTypes.any
    })
  )
};

export default Index;

import React from "react";
import PropTypes from "prop-types";
import { List, Dropdown } from "@ndustrial/nd-react-common";

function Index({ organizations, onOrgChange, facilities }) {
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
        {/* Code goes here */}
        <Dropdown data={organizations} callback={onOrgChange} />
        <List data={facilities} />
      </div>
    </div>
  );
}

Index.propTypes = {
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
  onOrgChange: PropTypes.func.isRequired
};

export default Index;

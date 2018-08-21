import React from "react";
import { List, Dropdown } from "@ndustrial/nd-react-common";

function Index() {
  return (
    <div className="main">
      <div className="app-information__title">Welcome to the skills test!</div>
      <div className="app-information__description">
        There are no right or wrong answers and no traps set, this is just meant
        to see how you approach a problem. Do what you think is best and feel
        free to ask questions
      </div>
      {/* Main Content */}
      <div className="main-content">{/* Code goes here */}</div>
    </div>
  );
}

export default Index;

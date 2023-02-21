import react from "react";
import { useState, useEffect } from "react";

const Home = ({ regions, handleRegionClick }) => {
  //this component renders the regions
  return (
    <div>
      {/* render bunch of placeholder cards */}
      <div className="container">
        <div
          className="card region-card"
          style={{ width: "18rem", height: "18rem" }}
        >
          <button>
            <div className="card-body">
              <h5 className="card-title">region 1</h5>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import Region from "../Region";
import Home from "../Home";

const Regions = ({ regions }) => {
  const [region, setRegion] = useState(null);
  const [home, setHome] = useState(true);

  const handleRegionClick = (region) => {
    setRegion(region);
    setHome(false);
  };

  return (
    <div>
      <div className="container">
        <div
          className="card region-card"
          style={{ width: "18rem", height: "18rem" }}
        >
          <button onClick={() => setHome(true)}>
            <div className="card-body">
              <h5 className="card-title">Home</h5>
            </div>
          </button>
        </div>
        {regions.map((region) => (
          <div
            key={region.name}
            className="card region-card"
            style={{ width: "18rem", height: "18rem" }}
          >
            <button onClick={() => handleRegionClick(region)}>
              <div className="card-body">
                <h5 className="card-title">{region.name}</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">
                  Average Calories: {region.averageCalories}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  Fat Per Serving: {region.fatPerServing} g
                </h6> */}
              </div>
            </button>
          </div>
        ))}
      </div>
      <div>{region && <Region region={region} />}</div>
      <div>{home && <Home  regions={regions} handleRegionClick={handleRegionClick}/>}</div>
    </div>
  );
};

export default Regions;

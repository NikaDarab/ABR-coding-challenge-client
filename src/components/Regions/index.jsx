import React, { useState } from "react";
import Region from "../Region";
import Home from "../Home";

const Regions = ({ regions, shoppingList, setShoppingList }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showHome, setShowHome] = useState(true);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setShowHome(false);
  };

  const renderCard = (region) => (
    <div key={region.name} className="card region-card card-species">
      <button
        onClick={() => handleRegionClick(region)}
        className="region-button"
      >
        <div className="card-body">
          <h5 className="card-title">{region.name}</h5>
          <div className="container info-gap">
            <h8 className="card-subtitle">
              Average Calories: {region.averageCalories}
            </h8>
            <h8 className="card-subtitle">
              Fat Per Serving: {region.fatPerServing} g
            </h8>
          </div>
        </div>
      </button>
    </div>
  );

  return (
    <div>
      <div className="container region-cards">
        <div className="card region-card region-card-home">
          <button onClick={() => setShowHome(true)} className="home-button">
            <div className="card-body">
              <h5 className="card-title">Home</h5>
            </div>
          </button>
        </div>
        {regions.map(renderCard)}
      </div>
      {showHome ? (
        <Home
          regions={regions}
          handleRegionClick={handleRegionClick}
          setShoppingList={setShoppingList}
        />
      ) : null}
      {selectedRegion && !showHome ? (
        <Region
          region={selectedRegion}
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
        />
      ) : null}
    </div>
  );
};

export default Regions;

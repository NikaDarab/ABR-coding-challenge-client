import React from "react";

const Region = ({ region }) => {
  return (
    <div>
      <div className="card region">
        <div className="card-body">
          <div className="container">
            <h1 className="region-title">{region.name}</h1>
            <h3 className="region-subtitle">
              Average Calories: {region.averageCalories}
            </h3>
            <h3 className="region-subtitle">
              Fat Per Serving: {region.fatPerServing} g
            </h3>
          </div>
          <div className="species-cards">
          {region.species.map((species) => (
            <div key={species.name} className="card species">
              <div className="card-body">
                <div className="container" style={{justifyContent:"space-between"}} >
                <h5 className="species-title">{species.name}</h5>
                <img
                  className="species-image animate__animated animate__pulse animation-pulse"
                  src={species.image.src}
                  alt={species.image.alt}
                />

                </div>
              
                <h6 className="species-subtitle">
                  Calories: {species.calories}
                </h6>
                <h6 className="species-subtitle">
                  Fat Total: {species.fatTotal}
                </h6>
                <div
                  className="species-description"
                  dangerouslySetInnerHTML={{
                    __html: species.description.taste,
                  }}
                />
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Region;

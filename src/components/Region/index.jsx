import React from "react";

const Region = ({ region, setShoppingList }) => {
  const addFish = (fish) => {
    setShoppingList((prevShoppingList) => {
      const updatedShoppingList = { ...prevShoppingList };
      updatedShoppingList[fish.name] = updatedShoppingList[fish.name]
        ? updatedShoppingList[fish.name] + 1
        : 1;
      return updatedShoppingList;
    });
  };
  const removeFish = (fish) => {
    setShoppingList((prevShoppingList) => {
      const updatedShoppingList = { ...prevShoppingList };
  
      if (updatedShoppingList[fish.name]) {
        updatedShoppingList[fish.name] -= 1;
  
        if (updatedShoppingList[fish.name] === 0) {
          delete updatedShoppingList[fish.name];
        }
      }
  
      return updatedShoppingList;
    });
  };

  return (
    <div>
      <div className="card region">
        <div className="card-body">
          <div className="container space-around">
            <h1 className="region-title">{region.name}</h1>
            <div className="container region-title title-gap">
              <h3 className="region-subtitle">
                Average Calories: {region.averageCalories}
              </h3>
              <h3 className="region-subtitle">
                Fat Per Serving: {region.fatPerServing} g
              </h3>
            </div>
          </div>
          <div className="species-cards">
            {region.species.map((species) => (
              <div key={species.name} className="card species">
                <div className="card-body">
                  <div
                    className="container"
                    style={{ justifyContent: "space-between" }}
                  >
                    <h5 className="species-title">{species.name}</h5>
                    <img
                      className="species-image animate__animated animate__pulse animation-pulse"
                      src={species.image.src}
                      alt={species.image.alt}
                    />
                  </div>
                  <div className="container title-gap">
                    <h6 className="species-subtitle">
                      Calories: {species.calories}
                    </h6>
                    <h6 className="species-subtitle">
                      Fat Total: {species.fatTotal}
                    </h6>
                  </div>
                  <p
                    className="species-description"
                    dangerouslySetInnerHTML={{
                      __html: species.description.quote,
                    }}
                  />
                  <p
                    className="species-description"
                    dangerouslySetInnerHTML={{
                      __html: species.description.taste,
                    }}
                  />
                  <p
                    className="species-description"
                    dangerouslySetInnerHTML={{
                      __html: species.description.healthBenefits,
                    }}
                  />
                  <div className="button-container">
                    <button onClick={() => addFish(species)}>+</button>
                    <button onClick={() => removeFish(species)}>-</button>
                  </div>
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

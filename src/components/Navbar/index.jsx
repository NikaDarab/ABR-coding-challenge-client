import { useState, useEffect } from "react";
import axios from "axios";
import Regions from "../Regions";
import ShoppingCart from "../ShoppingCart"

const Navbar = () => {
  const [regions, setRegions] = useState([]);
  const [shoppingList, setShoppingList] = useState({});

  const fetchData = () => {
    axios
      .get("http://localhost:5001/gofish?apikey=abrradiology")
      .then((response) => {
        setRegions(prepareData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
 //this should be in a helper file
  const prepareData = (data) => {
    const regionObjects = Object.values(
      data.reduce((acc, curr) => {
        const region = curr.NOAAFisheriesRegion;

        if (!acc[region]) {
          acc[region] = { name: region, species: [] };
        }
        acc[region].species.push({
          name: curr.SpeciesName,
          image: curr.SpeciesIllustrationPhoto,
          calories: curr.Calories,
          fatTotal: curr.FatTotal,
          description: {
            location: curr.Location,
            population: curr.Population,
            populationStatus: curr.PopulationStatus,
            animalHealth: curr.AnimalHealth,
            availability: curr.Availability,
            scientificName: curr.ScientificName,
            healthBenefits: curr.HealthBenefits,
            physicalDescription: curr.PhysicalDescription,
            quote: curr.Quote,
            taste: curr.Taste,
            speciesAliases: curr.SpeciesAliases,
          },
        });

        return acc;
      }, {})
    ).map((region) => {
      const totalCalories = data.reduce((acc, curr) => {
        const calories = parseInt(curr.Calories);
        return curr.NOAAFisheriesRegion === region.name &&
          !isNaN(calories) &&
          isFinite(calories)
          ? acc + calories
          : acc;
      }, 0);

      region.averageCalories = Math.round(
        totalCalories / region.species.length
      );

      const totalFatTotal = data.reduce((acc, curr) => {
        const fatTotal = parseInt(curr.FatTotal);
        return curr.NOAAFisheriesRegion === region.name &&
          !isNaN(fatTotal) &&
          isFinite(fatTotal)
          ? acc + fatTotal
          : acc;
      }, 0);

      region.fatPerServing = (totalFatTotal / region.species.length).toFixed(2);
      return region;
    });

    return regionObjects;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <ShoppingCart shoppingList={shoppingList} />
      {regions.length ? (
        <Regions
          regions={regions}
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
        />
      ) : null}
      
    </>
  );
};

export default Navbar;

 

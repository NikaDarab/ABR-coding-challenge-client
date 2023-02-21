import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Regions from "../Regions";
import Region from "../Region";

const Navbar = () => {
  const [data, setData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(null);
  const [home, setHome] = useState(true);

   const handleRegionClick = (region) => {
    setRegion(region);
  };


  useEffect(() => {
    axios
      .get("http://localhost:5001/gofish?apikey=abrradiology")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
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
        return curr.NOAAFisheriesRegion === region.name
          ? acc + parseInt(curr.Calories)
          : acc;
      }, 0);
      region.averageCalories = Math.round(
        totalCalories / region.species.length
      );

      const totalFatTotal = data.reduce((acc, curr) => {
        return curr.NOAAFisheriesRegion === region.name
          ? acc + parseInt(curr.FatTotal)
          : acc;
      }, 0);

      region.fatPerServing = (totalFatTotal / region.species.length).toFixed(2);
      return region;
    });

    setRegions(regionObjects);
  }, [data]);

  return (
    <>
      {/* <nav className="navbar">
        <div>
          <div id="navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  onClick={() => setHome(true)}
                >
                  Home
                </button>
              </li>
             
                {regions.map((region) => (
                      <li className="nav-item">
                        <button onClick={() => handleRegionClick(region)}>
                            {region.name}
                        </button>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </nav> */}
      {home ? <Regions regions={regions} /> : null}
    </>
  );
};

export default Navbar;

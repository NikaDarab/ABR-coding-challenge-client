import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "../Home";

const Navbar = () => {
  const [data, setData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [home, setHome] = useState(true);

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
        acc[region].species.push(curr.SpeciesName);

        return acc;
      }, {})
    ).map((region) => {
      const totalCalories = data.reduce((acc, curr) => {
        return curr.NOAAFisheriesRegion === region.name
          ? acc + parseInt(curr.Calories)
          : acc;
      }, 0);
      region.averageCalories = totalCalories / region.species.length;
      return region;
    });

    setRegions(regionObjects);
  }, [data]);

  return (
    <>
      <nav className="navbar">
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
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {home ? <Home regions={regions} /> : null}
    </>
  );
};

export default Navbar;

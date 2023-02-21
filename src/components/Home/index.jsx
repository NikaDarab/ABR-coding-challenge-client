import react from "react";
import { uniqueRegions } from "../../helper/helper";
import { averageCalories } from "../../helper/helper";

const Home = ({ regions }) => {
    const averageCal = averageCalories(regions);
  return (
    <div>
      {/* create cards for each region  */}
      {regions.map((region) => (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{region.NOAAFisheriesRegion}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
                Calories: {averageCal}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
                FatTotal: {region.FatTotal}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;


import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import Charts from "../ui/Charts";
import c from "./Dashboard.module.css";

const ReUtilChartDashbord = (p) => {
  const { isLoged, dataFilter } = useSelector((s) => s.loginr);
  const [crewsData, setCrewsData] = useState(false)
  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/data/chart/${p.type}?timeFrame=daily&year=${dataFilter.year}&month=${dataFilter.month}&cableStatus=${dataFilter.cableStatus}&crews=${dataFilter.crews}&problems=${dataFilter.problems}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setCrewsData((p) => ({ ...p, daily: data }));
    } catch (error) {
      console.error("Error:", error);
    }
    try {
        
      const response = await fetch(
        `${api}/data/chart/${p.type}?timeFrame=monthly&year=${dataFilter.year}&month=${dataFilter.month}&cableStatus=${dataFilter.cableStatus}&crews=${dataFilter.crews}&problems=${dataFilter.problems}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setCrewsData((p) => ({ ...p, monthly: data }));
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(
        `${api}/data/chart/${p.type}?timeFrame=weekly&year=${dataFilter.year}&month=${dataFilter.month}&cableStatus=${dataFilter.cableStatus}&crews=${dataFilter.crews}&problems=${dataFilter.problems}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setCrewsData((p) => ({ ...p, weekly: data }));
    } catch (error) {
      console.error("Error:", error);
    }
  }, [
    dataFilter.year,
    dataFilter.month,
    dataFilter.cableStatus,
    dataFilter.crews,
    dataFilter.problems,
    p.type,
    isLoged,
  ]);

  useEffect(() => {
    callback();
  }, [callback]);

  console.log(crewsData);
  return (
    <React.Fragment>
     

      <div className={c.chartHolder}>
        <div className={c.cahrtH} style={{width:"95%"}}> 
          {crewsData.daily && (
            <Charts
              data={crewsData.daily}
              title={`daily pareto by ${p.title}`}
            />
          )}
        </div>
        <div className={c.cahrtH}>
          {crewsData.weekly && (
            <Charts
              data={crewsData.weekly}
              title={`weekly pareto by ${p.title}`}
            />
          )}
        </div>
        <div className={c.cahrtH}>
          {crewsData.monthly && (
            <Charts
              data={crewsData.monthly}
              title={`monthly pareto by ${p.title}`}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReUtilChartDashbord;

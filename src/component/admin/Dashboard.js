import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import Charts from "../ui/Charts";
import c from "./Dashboard.module.css";

const Dashboard = (p) => {
  const { isLoged } = useSelector((s) => s.loginr);
  const [crewsData, setCrewsData] = useState(false);
  const [crewsFetch, setCrewsFetch] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    crews: "",
    cableStatus: "",
    problems: "",
  });
  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/data/chart/crew?timeFrame=daily&year=${crewsFetch.year}&month=${crewsFetch.month}&cableStatus=${crewsFetch.cableStatus}&crews=${crewsFetch.crews}&problems=${crewsFetch.problems}`,
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
        `${api}/data/chart/crew?timeFrame=monthly&year=${crewsFetch.year}&month=${crewsFetch.month}&cableStatus=${crewsFetch.cableStatus}&crews=${crewsFetch.crews}&problems=${crewsFetch.problems}`,
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
        `${api}/data/chart/crew?timeFrame=weekly&year=${crewsFetch.year}&month=${crewsFetch.month}&cableStatus=${crewsFetch.cableStatus}&crews=${crewsFetch.crews}&problems=${crewsFetch.problems}`,
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
    crewsFetch.year,
    crewsFetch.month,
    crewsFetch.cableStatus,
    crewsFetch.crews,
    crewsFetch.problems,
    isLoged,
  ]);

  useEffect(() => {
    callback();
  }, [callback]);

  console.log(crewsData);
  return (
    <React.Fragment>
      <div className={c.chartHolder}>
        <div className={c.cahrtH}>
          {crewsData && (
            <Charts data={crewsData.daily} title={"daily pareto by crews"} />
          )}
        </div>
        <div className={c.cahrtH}>
          {crewsData && (
            <Charts data={crewsData.monthly} title={"monthly pareto by crews"} />
          )}
        </div>
        <div className={c.cahrtH}>
          {crewsData && (
            <Charts data={crewsData.weekly} title={"weekly pareto by crews"} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;

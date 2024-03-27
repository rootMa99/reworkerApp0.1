import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";

const Dashboard = (p) => {
  const { isLoged } = useSelector((s) => s.loginr);
  const [crewsData, setCrewsData] = useState({});
  const [crewsFetch, setCrewsFetch] = useState({
    timeFrame: "monthly",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    crews: "",
    cableStatus: "",
    problems: "",
  });
  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/data/chart/crew?timeFrame=${crewsFetch.timeFrame}&year=${crewsFetch.year}&month=${crewsFetch.month}&cableStatus=${crewsFetch.cableStatus}&crews=${crewsFetch.crews}&problems=${crewsFetch.problems}`,
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
      setCrewsData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [
    crewsFetch.timeFrame,
    crewsFetch.year,
    crewsFetch.month,
    crewsFetch.cableStatus,
    crewsFetch.crews,
    crewsFetch.problems,
    isLoged,
  ]);

  useEffect(() => {callback()}, [callback]);

  return <React.Fragment></React.Fragment>;
};

export default Dashboard;

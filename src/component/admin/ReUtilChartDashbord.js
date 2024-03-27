
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import api from "../../services/api";
import Charts from "../ui/Charts";
import c from "./Dashboard.module.css";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",

    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol"`,

    textAlign: "center",
    outline: "none",
    border: "1px solid #414141",
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: "auto",
    "&:hover": {
      border: "1px solid #f33716",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "97%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "200px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f33716",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};
const ReUtilChartDashbord = (p) => {
  const { isLoged } = useSelector((s) => s.loginr);
  const [crewsData, setCrewsData] = useState(false);
  const [crewsFetch, setCrewsFetch] = useState(p.crewsFetch);
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

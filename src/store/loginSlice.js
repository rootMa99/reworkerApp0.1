import { createSlice } from "@reduxjs/toolkit";

const loginS = createSlice({
  name: "login",
  initialState: {
    isLoged: { login: false, role: "", token: "", id: "", username: "" },
    data: [],
    dataSelect: {},
    urgent: { urgent: false, data: null },
    urgentData: [],
    scrap: [],
    logistics: [],
    sertissage: [],
    dataFilter: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      crews: [],
      cableStatus: [],
      problems: [],
    },
  },
  reducers: {

    editYM(s,p){
      s.dataFilter.year=p.payload.year;
      s.dataFilter.month=p.payload.month
    },
    editcrew(s,p){
      s.dataFilter.crews= p.payload
    },
    editcableStatus(s,p){
      s.dataFilter.cableStatus=p.payload
    },
    editproblems(s,p){
      s.dataFilter.problems=p.payload
    },
    addUrgentData(s, p) {
      s.urgentData = p.payload;
    },
    addSertissageData(s, p) {
      s.sertissage = p.payload;
    },
    addLogisticsData(s, p) {
      s.logistics = p.payload;
    },
    addDataSelect(s, p) {
      s.dataSelect = p.payload;
    },
    setUrgent(s, p) {
      s.urgent = { urgent: p.payload.urgent, data: p.payload.data };
    },
    addScrap(s, p) {
      s.scrap = p.payload;
    },
    login(s, p) {
      s.isLoged.login = true;
      s.isLoged.role = p.payload.role;
      s.isLoged.token = p.payload.token;
      s.isLoged.id = p.payload.id;
      s.isLoged.username = p.payload.username;
    },
    logout(s, p) {
      s.isLoged = { login: false, role: "", token: "", id: "", username: "" };
    },
    addData(s, p) {
      s.data = p.payload.data;
    },
    unshiftData(s, p) {
      if (p.payload.page === 1) {
        s.data.unshift(p.payload.data);
      }
    },
    unshiftDataUrgent(s, p) {
      const index = s.urgentData.findIndex((f) => f._id === p.payload._id);
      if (index === -1) {
        s.urgentData.unshift(p.payload);
      }
    },
    unshiftDataSertissage(s, p) {
      if (s.sertissage.length > 0) {
        const index = s.sertissage.findIndex((f) => f._id === p.payload._id);
        if (index === -1) {
          s.sertissage.unshift(p.payload);
        }
      } else {
        s.sertissage.unshift(p.payload);
      }
    },
    editStatus(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);
      if (index !== -1) {
        s.data[index].cableStatus = p.payload.cableStatus;
        s.data[index].problem = p.payload.problem;
        s.data[index].details = p.payload.details;
      } else {
        let data = p.payload.data;
        data = { ...data, cableStatus: p.payload.cableStatus };
        s.data.push(data);
      }

      if (p.payload.urgent && p.payload.cableStatus === "Repaired") {
        const t = JSON.parse(JSON.stringify(s.urgentData)).filter(
          (f) => f._id !== p.payload.id
        );
        s.urgentData = t;
      } else {
        const d = JSON.parse(JSON.stringify(s.urgentData));
        const indexur =
          d.length > 0 ? d.findIndex((f) => f._id === p.payload.id) : -1;
        if (indexur !== -1) {
          s.urgentData[indexur].cableStatus = p.payload.cableStatus;
          s.urgentData[indexur].problem = p.payload.problem;
          s.urgentData[indexur].details = p.payload.details;
        }
      }
      if (p.payload.cableStatus !== "Sertissage") {
        const t = JSON.parse(JSON.stringify(s.sertissage)).filter(
          (f) => f._id !== p.payload.id
        );
        s.sertissage = t;
      } else {
        const d = JSON.parse(JSON.stringify(s.sertissage));
        const indexur = d.findIndex((f) => f._id === p.payload.id);
        if (indexur !== -1) {
          s.sertissage[indexur].cableStatus = p.payload.cableStatus;
          s.sertissage[indexur].problem = p.payload.problem;
          s.sertissage[indexur].details = p.payload.details;
        }
      }
    },
    addaudit(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);

      if (s.data[index].cP.trim() !== "") {
        s.data[index].cP = p.payload.cp;
      }
      if (s.data[index].auditorAction.trim() !== "") {
        s.data[index].auditorAction = p.payload.audia;
      }
      if (
        s.data[index].cP.trim() === "" &&
        s.data[index].auditorAction.trim() === ""
      ) {
        s.data[index].cP = p.payload.cp;
        s.data[index].auditorAction = p.payload.audia;
      }
    },
    addTL(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);
      if (s.data[index].pPD.trim() !== "") {
        s.data[index].pPD = p.payload.ppd;
      }
      if (s.data[index].idPD.trim() !== "") {
        s.data[index].idPD = p.payload.idpd;
      }
      if (s.data[index].teamLeaderAction.trim() !== "") {
        s.data[index].teamLeaderAction = p.payload.cma;
      }
      if (
        s.data[index].pPD.trim() === "" &&
        s.data[index].idPD.trim() === "" &&
        s.data[index].teamLeaderAction.trim() === ""
      ) {
        s.data[index].pPD = p.payload.ppd;
        s.data[index].idPD = p.payload.idpd;
        s.data[index].teamLeaderAction = p.payload.cma;
      }
    },
    addsl(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);
      const index2 = s.scrap.findIndex((f) => f._id === p.payload.id);

      if (index !== -1) {
        if (s.data[index].shiftLeaderAction.trim() !== "") {
          s.data[index].shiftLeaderAction = p.payload.sl;
        }
        if (s.data[index].shiftLeaderAction.trim() === "") {
          s.data[index].shiftLeaderAction = p.payload.sl;
        }
      }
      if (index2 !== -1) {
        if (s.scrap[index2].shiftLeaderAction.trim() !== "") {
          s.scrap[index2].shiftLeaderAction = p.payload.sl;
        }

        if (s.scrap[index2].shiftLeaderAction.trim() === "") {
          s.scrap[index2].shiftLeaderAction = p.payload.sl;
        }
      }
    },
    addRoot(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);
      s.data[index].crew = p.payload.data.crew;
      s.data[index].problem = p.payload.data.problem;
      s.data[index].details = p.payload.data.detail;
      s.data[index].cableStatus = p.payload.data.cs;
      s.data[index].pDD = p.payload.data.pdd;
      s.data[index].cP = p.payload.data.cp;
      s.data[index].pPD = p.payload.data.ppd;
      s.data[index].idPD = p.payload.data.idpd;
      s.data[index].teamLeaderAction = p.payload.data.cma;
      s.data[index].auditorAction = p.payload.data.audia;
      s.data[index].shiftLeaderAction = p.payload.data.sl;
    },
    deleteRow(s, p) {
      s.data = s.data.filter((f) => f._id !== p.payload);
      if (s.scrap.length > 0) {
        const index = s.scrap.findIndex((f) => f._id === p.payload.id);
        if (index !== -1) {
          s.scrap = s.scrap.filter((f) => f._id !== p.payload);
        }
      }
      if (s.urgentData.length > 0) {
        const indexu = s.urgentData.findIndex((f) => f._id === p.payload.id);
        if (indexu !== -1) {
          s.urgentData = s.urgentData.filter((f) => f._id !== p.payload);
        }
      }
      if (s.sertissage.length > 0) {
        const indexu = JSON.parse(JSON.stringify(s.sertissage)).findIndex(
          (f) => f._id === p.payload
        );
        console.log(
          indexu,
          JSON.parse(JSON.stringify(s.sertissage)),
          s.sertissage,
          p.payload
        );
        if (indexu !== -1) {
          s.sertissage = JSON.parse(JSON.stringify(s.sertissage)).filter(
            (f) => f._id !== p.payload
          );
        }
      }
    },
    deleteRef(s, p) {
      const index = s.logistics.findIndex((f) => f._id === p.payload);
      if (index !== -1) {
        s.logistics = s.logistics.filter((f) => f._id !== p.payload);
      }
    },
  },
});

export const loginSActions = loginS.actions;
export default loginS;

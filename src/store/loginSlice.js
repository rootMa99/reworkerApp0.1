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
  },
  reducers: {
    addUrgentData(s, p) {
      s.urgentData = p.payload;
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
      s.urgentData.unshift(p.payload);
    },
    editStatus(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);
      if (index !== -1) {
        s.data[index].cableStatus = p.payload.cableStatus;
      } else {
        let data = p.payload.data;
        console.log(data.cableStatus, p.payload.cableStatus);
        data = { ...data, cableStatus: p.payload.cableStatus };
        s.data.push(data);
      }
      if (p.payload.urgent) {
        const t = JSON.parse(JSON.stringify(s.urgentData)).filter(
          (f) => f._id !== p.payload.id
        );
        s.urgentData = t;
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
      if (s.scrap[index2].shiftLeaderAction.trim() !== "") {
        s.scrap[index2].shiftLeaderAction = p.payload.sl;
      }

      if (s.scrap[index2].shiftLeaderAction.trim() === "") {
        s.scrap[index2].shiftLeaderAction = p.payload.sl;
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
      const index = s.scrap.findIndex((f) => f._id === p.payload.id);
      if (index !== -1) {
        s.scrap = s.scrap.filter((f) => f._id !== p.payload);
      }
      const indexu = s.urgentData.findIndex((f) => f._id === p.payload.id);
      if (indexu !== -1) {
        s.urgentData = s.urgentData.filter((f) => f._id !== p.payload);
      }
    },
  },
});

export const loginSActions = loginS.actions;
export default loginS;

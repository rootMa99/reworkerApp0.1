import { createSlice } from "@reduxjs/toolkit";

const loginS = createSlice({
  name: "login",
  initialState: {
    isLoged: { login: false, role: "", token: "", id: "", username: "" },
    data: [],
  },
  reducers: {
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
      if (s.data.length === 0) {
        if(p.payload.status){
          s.data.push(...p.payload.data);
        }else{
          s.data.push(p.payload)
        }
      } else {
        s.data.unshift(p.payload);
      }
    },
    addaudit(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);
      if (
        s.data[index].causeOfTheProblem.trim() === "" &&
        s.data[index].auditAction.trim() === ""
      ) {
        s.data[index].causeOfTheProblem = p.payload.cotp;
        s.data[index].auditAction = p.payload.audAct;
      }
      if (s.data[index].causeOfTheProblem.trim() !== "") {
        s.data[index].causeOfTheProblem = p.payload.cotp;
      }
      if (s.data[index].auditAction.trim() !== "") {
        s.data[index].auditAction = p.payload.audAct;
      }
    },
    addTL(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);
      if (
        s.data[index].positionOfWhoProducesDefect.trim() === "" &&
        s.data[index].idOfWhoProducesDefect.trim() === "" &&
        s.data[index].foremanAction.trim() === ""
      ) {
        s.data[index].positionOfWhoProducesDefect = p.payload.cppd;
        s.data[index].idOfWhoProducesDefect = p.payload.idpd;
        s.data[index].foremanAction = p.payload.tlact;
      }
      if (s.data[index].positionOfWhoProducesDefect.trim() !== "") {
        s.data[index].positionOfWhoProducesDefect = p.payload.cppd;
      }
      if (s.data[index].idOfWhoProducesDefect.trim() !== "") {
        s.data[index].idOfWhoProducesDefect = p.payload.idpd;
      }
      if (s.data[index].foremanAction.trim() !== "") {
        s.data[index].foremanAction = p.payload.tlact;
      }
    },
    addRoot(s, p) {
      const index = s.data.findIndex((f) => f._id === p.payload.id);
      s.data[index].crew = p.payload.data.crew;
      s.data[index].reference = p.payload.data.reference;
      s.data[index].problem = p.payload.data.problem;
      s.data[index].motif = p.payload.data.motif;
      s.data[index].motif = p.payload.data.motif;
      s.data[index].positionToDetectFault = p.payload.data.positionToDetectFault;
      s.data[index].cableStatus = p.payload.data.foremanAction;
      s.data[index].positionOfWhoProducesDefect = p.payload.data.positionOfWhoProducesDefect;
      s.data[index].idOfWhoProducesDefect =
        p.payload.data.idOfWhoProducesDefect;
      s.data[index].foremanAction = p.payload.data.foremanAction;
      s.data[index].causeOfTheProblem = p.payload.data.causeOfTheProblem;
      s.data[index].auditAction = p.payload.data.auditAction;
    },
    deleteRow(s, p){
      s.data=s.data.filter(f=>f._id !== p.payload);
    }
  },
});

export const loginSActions = loginS.actions;
export default loginS;

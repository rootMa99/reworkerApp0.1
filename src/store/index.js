import { configureStore } from "@reduxjs/toolkit";
import loginS from "./loginSlice";

const store = configureStore({
  reducer: { loginr: loginS.reducer },
});

export default store;

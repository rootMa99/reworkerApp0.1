import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";


const Dashboard=p=>{
    const { isLoged } = useSelector((s) => s.loginr);

    const callback=useCallback(async ()=>{
        try {
            const response = await fetch(`${api}/metadata`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${isLoged.token}`,
              },
            });
      
            const data = await response.json();
            console.log(data);
            dispatch(
              loginSActions.addDataSelect(data)
            );
          } catch (error) {
            console.error("Error:", error);
          }
    })

    return(
        <React.Fragment>
        </React.Fragment>
    )
}

export default Dashboard;
import React from "react";
import { useState } from "react"; 
const Login = (props) => {
  console.log(props)
  // function handleSignOut(event) {
  //   props.setUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // }
  //if we have no user show sign in button
  //if we have a user show sign out button
    return (
        <div> 
        <div id="signInDiv"></div>
        {/* <button onClick={(e)=> handleSignOut(e)}>Sign Out</button> */}
        </div>

    )
}
 export default Login;
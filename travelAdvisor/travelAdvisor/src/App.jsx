import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, Home, HotelsList, MapView, RestaurantsList, AttractionsList, SearchResult } from "./pages";
import { PlaceDetails } from "./pages/templates";
import { useEffect , useState } from "react"; 
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [user, setUser]= useState(undefined);


  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Toekn: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    // document.getElementById("signInDiv").hidden = true;
  }

console.log("this is the user", user);

useEffect(() => {
  /* global google */
  google.accounts.id.initialize({
    client_id: "816745726515-imf70rhnjf4fannq3p5fmuop9v576l48.apps.googleusercontent.com",
    callback: handleCallbackResponse,
  })
  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {
      theme: "outline",
      size: "large",
    }
  );

  google.accounts.id.prompt();
}, [user])

  //const isloggedIn = false;
  
  return (

    <>
  
      {
        user!= undefined ?
          <Switch>
            <Route exact path={"/"}>
              <Home setUser={setUser}/>
            </Route>
            <Route path={"/map"}>
              <MapView />
            </Route>
            <Route exact path={"/restaurants"}>
              <RestaurantsList setUser={setUser}/>
            </Route>
            <Route exact path={"/hotels"}>
              <HotelsList setUser={setUser}/>
            </Route>
            <Route exact path={"/attractions"}>
              <AttractionsList setUser={setUser} />
            </Route>
            <Route path={"/search"}>
              <SearchResult setUser={setUser}/>
            </Route>
            <Route path={"/:type/:id"}>
              <PlaceDetails setUser={setUser}/>
            </Route>
          </Switch> : <Login setUser={setUser}/>
          
      }

    </>
  )
}

export default App

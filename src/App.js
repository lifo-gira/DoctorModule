import React, { useEffect, useState} from "react";
import './App.css';
import Profilebar from './Components/Profilebar';
import Regimebuilder from './Components/Regimebuilder';
import VideoCall from "./Components/VideoCall"
import { BrowserRouter as Route, Router, Switch } from "react-router-dom";
function App() {
  const [activeMenuItem, setActiveMenuItem] = useState("Profilebar");
  const [userID, setuserID] = useState(null);
  const handleMenuItemClick = (menuItem, userId) => {
    setuserID(userId);
    setActiveMenuItem(menuItem);
    console.log(userID); // This will print the updated value
  };

  useEffect(() => {
    console.log(userID); // Log the updated userID after it's been set
  }, [userID]);

  const handleCallClick = ()=>{
    setActiveMenuItem("VideoCall")
  }
  const [patflag,setpatflag] = useState('false');
console.log("start  ",patflag)
  const onPatList = ()=>{
    setActiveMenuItem("Profilebar")
    setpatflag('true')
    console.log("meet end",patflag)
  }
  return (
    <>
    <div className="App">
      {activeMenuItem === "Profilebar" && <Profilebar onRegimeClick={(userId)=> handleMenuItemClick("Regimebuilder",userId)} handleVideoClick={handleCallClick} patlis={patflag}/>}
      {activeMenuItem === "Regimebuilder" && <Regimebuilder userId={userID} onProfileClick={()=>handleMenuItemClick("Profilebar")}/>}
      {activeMenuItem === "VideoCall" && (
        <VideoCall onVideocallClick={()=>handleMenuItemClick("VideoCall")} onMeetEnd={onPatList}/>
      )}
    </div>
    </>
  );
}

export default App;

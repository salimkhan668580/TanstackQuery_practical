import {  useEffect } from 'react'
import './App.css'
// import useCounter from './CustomHooks/UseCounter'
import Home from './Home';
// import { myContext } from './ContextAPI/ContextCount';
// import TanstackPage from './TanstackQuery/TanstackPage';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import TansTacView from './TanstackQuery/TansTacView';
import ScrolingPage from './TanstackQuery/ScrolingPage';
// import DiceRoller from './Question/DiceRoller';
import VideoCall from './AgoraVideo/VideoCall';
import LinkCopy from './LinkCopy';
// import Paymentpage from './Payment/Paymentpage';
import HomePage from './HomePage';
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";
import { axiosInstance } from './axiox/axiosInstance';





function App() {

  
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BAclQc7MzH1hVFLvJ3lSAHGVYpG_uWKWr6qNMnrP5eeAxjSV86qzryitHq5tcHntz1Sfe8BqGh9LxCu0DNN0ObM",
      });
const fcmBody = {
  userId: "691ec6c7f95bcee92f88e9ba",
  deviceType: "web",
  fcmTokens: [
    token
  ]
};

 await axiosInstance.post("http://localhost:3000/user/save/fcm", fcmBody);
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  
  useEffect(() => {
    requestPermission();
  }, []);


  useEffect(() => {
    const getUrl = async () => {
      try {
        const url = await H.getSessionURL();
        console.log('Session URL is:', url);
      } catch (error) {
        console.error(error);
      }
    };

    getUrl();
  }, []);



  return (
    <BrowserRouter>
    <Routes>
      <Route path='/link'  element={<LinkCopy/>}/>
      {/* <Route path='/'  element={<Paymentpage/>}/> */}
      <Route path='/'  element={<HomePage/>}/>
      {/* <Route path='/'  element={<DiceRoller/>}/> */}
      {/* <Route path='/'  element={<TanstackPage/>}/> */}
      <Route path='/home'  element={<Home/>}/>
      <Route path='/scrolling'  element={<ScrolingPage/>}/>
      <Route path='/video-call'  element={<VideoCall/>}/>
      <Route path='/view/:id'  element={<TansTacView/>}/>
    </Routes>
    </BrowserRouter>


   

 
   
  )
}

export default App

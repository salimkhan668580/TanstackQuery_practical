import { useContext, useEffect, useState } from 'react'
import './App.css'
// import useCounter from './CustomHooks/UseCounter'
import Home from './Home';
import { myContext } from './ContextAPI/ContextCount';
import TanstackPage from './TanstackQuery/TanstackPage';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import TansTacView from './TanstackQuery/TansTacView';
import ScrolingPage from './TanstackQuery/ScrolingPage';





function App() {

  
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
      <Route path='/'  element={<TanstackPage/>}/>
      <Route path='/scrolling'  element={<ScrolingPage/>}/>
      <Route path='/view/:id'  element={<TansTacView/>}/>
    </Routes>
    </BrowserRouter>


   

 
   
  )
}

export default App

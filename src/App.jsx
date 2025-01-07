import { useContext, useState } from 'react'
import './App.css'
// import useCounter from './CustomHooks/UseCounter'
import Home from './Home';
import { myContext } from './ContextAPI/ContextCount';
import TanstackPage from './TanstackPage';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import TansTacView from './TansTacView';




function App() {
  // const {count,setCount}=useContext(myContext)


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<TanstackPage/>}/>
      <Route path='/view/:id'  element={<TansTacView/>}/>
    </Routes>
    </BrowserRouter>


   

 
   
  )
}

export default App

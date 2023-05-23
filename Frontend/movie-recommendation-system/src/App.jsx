import { Fragment } from 'react'
import Home from './Components/Index/Index'
import Input from './Components/Input/Input';
import Output from './Components/Output/Output';
import TestModal from './Components/Input/Testmodal'
import './App.css'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/input" element={<Input />}></Route>
      <Route path="/output" element={<Output />}></Route>
      <Route path="/webcam" element={<TestModal />}></Route>
    </Routes>
  )
}

export default App

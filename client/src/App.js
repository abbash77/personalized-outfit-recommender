
import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import FlipkartIndex from './FlipkartIndex';
import Chat from './Chat2';

function App() {
  return(
<div>
    
      <Router>
        <Routes>
          <Route path='/' element={<FlipkartIndex/>}></Route>
          <Route path='/chat' element={<Chat/>}></Route>

        </Routes>
      </Router>
    </div>
  )
  
}

export default App;


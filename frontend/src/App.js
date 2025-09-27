
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useState } from 'react';
import RefreshHnadler from './RefreshHnadler';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ Children }) => {
    return isAuthenticated ? Children : <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <RefreshHnadler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;

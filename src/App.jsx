import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useContext } from 'react';
import { AuthContext } from './Auth';

function App() {

  const currentUser = useContext(AuthContext)
  console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={'/'} />
    }
    else{
      return children
    }
  }

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>

    </div>
  );
}

export default App;

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import CreateListing from './pages/CreateListing'
function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Routes>
       
        <Route path="/" element={<Home />} />
<Route
          path="/create-listing"
          element={user ? <CreateListing /> : <Navigate to="/login" />}
        />
       
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

     
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  )
}

export default App;

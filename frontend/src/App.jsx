
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
    
    </Routes>
    </div>
  )
}

export default App
 
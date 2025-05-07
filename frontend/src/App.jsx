import {BrowserRouter as Router , Routes, Route, useNavigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import PrRoutes from './utils/PrRoutes'


function App() {
 return(
<>
<Router>
<Routes>
  <Route path="/" element={<PrRoutes><Home/></PrRoutes>} />
  <Route path="/dashboard" element={<PrRoutes><Home/></PrRoutes>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<SignUp/>} />
</Routes>
</Router>

</>
 )
}

export default App


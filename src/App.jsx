import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPage from './pages/Routes/UserPage'
import FarmerPage from './pages/Routes/FarmerPage'
import Login from './pages/LoginRegister/Login'
import Register from './pages/LoginRegister/Register'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path='/farmer' element={<FarmerPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
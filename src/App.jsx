import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./pages/Routes/UserPage";
import FarmerPage from "./pages/Routes/FarmerPage";
import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";
import Success from "./Components/Payment/Success";
import Failure from "./Components/Payment/Failure";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/farmer" element={<FarmerPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Failure />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import DrawerAppBar from "../../components/Navbar";
import Login from "../../pages/Login";
// import Register from "../../pages/Register"
import Home from "../../pages/Home/Home";
import Register from "../../pages/Register";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = () => {
  
  // const navigate = useNavigate();
  
  return (
    <>
      <BrowserRouter>
        <DrawerAppBar />
        <Routes>
          <Route path="/" element={<Register />} exact/>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoutes  component={<Home />}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

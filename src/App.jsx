
// import './App.css'
// import {Home} from './Home'
// function App() {


//   return (
//     <>
//       <div>
//         <Home/>
//       </div>

//     </>
//   )
// }

// export default App



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home";
import AdminDashboard from "./admin/AdminDashboard";
import CitizenDashboard from "./citizen/CitizenDashboard";
import { Dashboard } from "./components/dashborad/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

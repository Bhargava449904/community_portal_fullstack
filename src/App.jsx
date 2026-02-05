import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import  Dashboard  from "./components/dashboard/Dashboard";
import Citizendash from "./components/dashboard/Citizendash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/create_issue" element={<Citizendash/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

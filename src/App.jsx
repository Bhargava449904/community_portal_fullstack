import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import  Dashboard  from "./components/dashboard/Dashboard";
import Citizendash from "./components/dashboard/Citizendash";
import MyIssues from "./components/dashboard/Myissues";
import Admindash from "./components/dashboard/Admindash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/create_issue" element={<Citizendash/>} />
        <Route path="/view_my_issues" element={<MyIssues/>} />
        <Route path="/admin_view_all_issues/" element={<Admindash/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

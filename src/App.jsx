import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import  Dashboard  from "./components/dashboard/Dashboard";
import Citizendash from "./components/dashboard/Citizendash";
import MyIssues from "./components/dashboard/Myissues";
import Admindash from "./components/dashboard/Admindash";
import Sadmincreateadmin from "./components/dashboard/Sadmincreateadmin";
import Sadminviewalladmin from "./components/dashboard/Sadminviewalladmin"

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
        <Route path="/super_admin_create_admin/" element={<Sadmincreateadmin/>} />
        <Route path="/super_admin_view_admins/" element={<Sadminviewalladmin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

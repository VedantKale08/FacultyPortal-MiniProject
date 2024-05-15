import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/TeacherPortal/Dashboard";
import SideBar_Teacher from "./components/TeacherPortal/SideBarTeacher";
import TeacherProfile from "./components/TeacherPortal/TeacherProfile";
import AdminDashboard from "./components/AdminPortal/AdminDashboard";
import SideBarAdmin from "./components/AdminPortal/SideBarAdmin";
import AllTeachers from "./components/AdminPortal/AllTeachers";
import LecturesTT from "./components/AdminPortal/LecturesTT";

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
          path="/Dashboard"
          element={
            <>
              <SideBar_Teacher>
                <Dashboard />
              </SideBar_Teacher>
            </>
          }
        />

        <Route
          path="/teacher_profile"
          element={
            <>
              <SideBar_Teacher>
                <TeacherProfile/>
              </SideBar_Teacher>
            </>
          }
        />

        
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;

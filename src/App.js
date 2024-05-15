import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/TeacherPortal/Dashboard";

import LectureHistory from "./components/TeacherPortal/LectureHistory";
import SideBar_Teacher from "./components/TeacherPortal/SideBarTeacher";
import TeacherProfile from "./components/TeacherPortal/TeacherProfile";
import TeacherLectureTT from "./components/TeacherPortal/TeacherLectureTT";

import AdminDashboard from "./components/AdminPortal/AdminDashboard";
import SideBarAdmin from "./components/AdminPortal/SideBarAdmin";
import AllTeachers from "./components/AdminPortal/AllTeachers";
import LecturesTT from "./components/AdminPortal/LecturesTT";
import AdminLectureHistory from "./components/AdminPortal/LectureHistory";
import SideBarTeacher from "./components/TeacherPortal/SideBarTeacher";
import TeacherNotification from "./components/TeacherPortal/TeacherNotification";

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
                <SideBarTeacher>
                  <Dashboard />
                </SideBarTeacher>
              </>
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              <>
                <SideBarAdmin>
                  <AdminDashboard />
                </SideBarAdmin>
              </>
            }
          />
          <Route
            path="/AllTeachers"
            element={
              <>
                <SideBarAdmin>
                  <AllTeachers />
                </SideBarAdmin>
              </>
            }
          />
          <Route
            path="/AdminLectureHistory"
            element={
              <>
                <SideBarAdmin>
                  <AdminLectureHistory />
                </SideBarAdmin>
              </>
            }
          />

          <Route
            path="/lecture_history"
            element={
              <>
                <SideBarTeacher>
                  <LectureHistory />
                </SideBarTeacher>
              </>
            }
          />
          <Route
            path="/LecturesTT"
            element={
              <>
                <SideBarAdmin>
                  <LecturesTT />
                </SideBarAdmin>
              </>
            }
          />

          <Route
            path="/teacherLectureTT"
            element={
              <>
                <SideBarTeacher>
                  <TeacherLectureTT />
                </SideBarTeacher>
              </>
            }
          />

          <Route
            path="/TeacherNotification"
            element={
              <>
                <SideBarTeacher>
                  <TeacherNotification/>
                </SideBarTeacher>
              </>
            }
          />



          <Route
            path="/teacher_profile"
            element={
              <>
                <SideBarTeacher>
                  <TeacherProfile />
                </SideBarTeacher>
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

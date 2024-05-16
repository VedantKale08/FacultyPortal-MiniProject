import { ChevronRight, Eye, EyeOff, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import TimeSlotPopup from "./TimeSlotPopup";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";

const Register = () => {
  const [toggleEye, setToggleEye] = useState(false);
  const [tab, setTab] = useState(0);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNumber: "",
    qualifications: "",
    departmentName: "",
    photo: "",
  });
    const [formData, setFormData] = useState({
      weekday: "",
      startTime: "",
      endTime: "",
      program: "",
      year: "",
      course: "",
    });
  const [timeSlot, setTimeSlot] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const uploadImage = (file) => {
    if (file === undefined) {
      toast.error("Invalid Image!");
      return;
    }
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      setImage(URL.createObjectURL(file));
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "study-nex");
      data.append("cloud_name", "dgu3ljso6");
      fetch("https://api.cloudinary.com/v1_1/dgu3ljso6/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setData((prev) => ({
            ...prev,
            photo: res.url,
          }));
        });
    } else {
      toast.error("Invalid Image!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/teachers/register", {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          photo: data.photo,
          departmentName: data.departmentName,
          qualifications: data.qualifications,
          subjects: timeSlot,
      });
      setData({
        fname: "",
        lname: "",
        email: "",
        password: "",
        phoneNumber: "",
        qualifications: "",
        departmentName: "",
      });
      toast.success("Registration successful!")
      setCookie('token',res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    const newTimeSlot = {
      course: formData.course,
      program: formData.program,
      year: formData.year,
      timeSlot: {
        weekday: formData.weekday,
        startTime: formData.startTime,
        endTime: (parseInt(formData.startTime)+1).toString(),
      },
    };

    setTimeSlot((prev) => [...prev, newTimeSlot]);
    setShowPopup(false);
    setFormData({
      week_day: "",
      st_time: "",
      end_time: "",
      program: "",
      year: "",
      course: "",
    });
  }
  useEffect(() => {
    if (getCookie("token")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="bg-[#6EBCEC] h-screen overflow-hidden flex justify-center items-center">
      <div className="bg-white w-[40vw] p-10 rounded-lg shadow-md flex flex-col gap-5">
        <div className="text-center">
          <p className="text-3xl font-bold">FacultyPortal</p>
          <p className="text-slate-500 text-sm">Welcome to faculty portal !</p>
        </div>

        {tab === 0 && (
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setTab(1);
            }}
          >
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="fname" className="text-slate-800">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="fname"
                  id="fname"
                  value={data.fname}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-3 w-full"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="lname" className="text-slate-800">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  name="lname"
                  id="lname"
                  value={data.lname}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-3 w-full"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="email" className="text-slate-800">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="text-slate-800">
                Password
              </label>
              <input
                type={toggleEye ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md px-4 py-3"
              ></input>
              {!toggleEye && (
                <Eye
                  className="text-slate-400 absolute bottom-3 right-3 cursor-pointer"
                  onClick={() => setToggleEye(true)}
                />
              )}
              {toggleEye && (
                <EyeOff
                  className="text-slate-400 absolute bottom-3 right-3 cursor-pointer"
                  onClick={() => setToggleEye(false)}
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-[#61BDF6] text-white p-4 py-3 rounded-md hover:opacity-90 flex gap-2 justify-center items-center"
            >
              Next <ChevronRight size={18} />
            </button>
          </form>
        )}

        {tab === 1 && (
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setTab(2);
            }}
          >
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="text-slate-800">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter mobile number"
                name="phoneNumber"
                id="phoneNumber"
                value={data.phoneNumber}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div className="flex gap-5">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="qualifications" className="text-slate-800">
                  Qualifications
                </label>
                <input
                  type="text"
                  placeholder="Enter qualifications"
                  name="qualifications"
                  id="qualifications"
                  value={data.qualifications}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-3 w-full"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="departmentName" className="text-slate-800">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="Enter department"
                  name="departmentName"
                  id="departmentName"
                  value={data.departmentName}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-3 w-full"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="photo" className="text-slate-800">
                Select your photo
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="text-sm"
                required
                onChange={(e) => uploadImage(e.target.files[0])}
              />

              {image && (
                <img
                  src={image}
                  alt=""
                  className="w-24 h-24 cursor-pointer object-cover bg-center"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-[#61BDF6] text-white p-4 py-3 rounded-md hover:opacity-90 flex gap-2 justify-center items-center"
            >
              Next
            </button>
          </form>
        )}

        {tab === 2 && (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {showPopup && (
              <TimeSlotPopup
                addTimeSlot={addTimeSlot}
                setShowPopup={setShowPopup}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            <div className="flex justify-between">
              <p className="text-xl">Add lecture slots</p>
              <span
                onClick={() => setShowPopup(true)}
                className="bg-[#61BDF6] text-white rounded-full flex justify-center items-center w-8 h-8 cursor-pointer"
              >
                <Plus />
              </span>
            </div>

            {timeSlot.length !== 0 ? (
              timeSlot.map((slot, index) => (
                <div key={index} className="border-b border-slate-300 pb-3">
                  <p>{slot.course}</p>
                  <p className="text-sm text-slate-500">
                    {slot?.timeSlot?.startTime}.00 to {slot?.timeSlot?.endTime}.00 &bull;{" "}
                    {slot.program} &bull; {slot.year} year
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-center my-4">No lectures added</p>
            )}

            <button
              type="submit"
              className="bg-[#61BDF6] text-white p-4 py-3 rounded-md hover:opacity-90 flex gap-2 justify-center items-center"
            >
              Sign up
            </button>
          </form>
        )}

        {tab === 0 && (
          <div className="text-sm text-slate-500 text-center">
            <p>
              Already have a account?{" "}
              <span className="text-[#59a1ce]">
                <Link to="/">Sign in</Link>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

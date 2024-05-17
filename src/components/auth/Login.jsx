import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getCookie,setCookie } from "cookies-next";
import axios from "axios";
import toast from 'react-hot-toast';

const Login = () => {
    const [toggleEye, setToggleEye] = useState(false); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          "http://localhost:3001/api/teachers_admin/login",
          {
            email: email,
            password: password,
          }
        );

        toast.success("Login successful!")
        setCookie('token',res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        if(email === "admin" && password === "admin123"){
          setCookie("is_admin",true);
          navigate("/adminDashboard");
        }else{
          setCookie("is_admin", false);
          navigate('/dashboard');
        }
      } catch (error) {
        console.log(error);
        toast.error("Invalid credentials");
      }
    }
    
    useEffect(()=>{
      if(getCookie('token')){
        navigate('/dashboard');
      }
    },[])

  return (
    <div className="bg-[#6EBCEC] h-screen overflow-hidden flex justify-center items-center">
      <form className="bg-white md:w-[40vw] w-[90vw] p-10 rounded-lg shadow-md flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="text-center">
          <p className="text-3xl font-bold">FacultyPortal</p>
          <p className="text-slate-500 text-sm">Welcome to faculty portal !</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-slate-800">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button type="submit" className="bg-[#61BDF6] text-white p-4 py-3 rounded-md hover:opacity-90">
          Sign in
        </button>
        <div className="text-sm text-slate-500 text-center">
          <p>
            Don't have a account?{" "}
            <span className="text-[#59a1ce]">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login
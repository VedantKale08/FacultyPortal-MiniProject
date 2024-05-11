import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const [toggleEye, setToggleEye] = useState(false); 
  return (
    <div className="bg-[#6EBCEC] h-screen overflow-hidden flex justify-center items-center">
      <form className="bg-white w-[40vw] p-10 rounded-lg shadow-md flex flex-col gap-5">
        <div className="text-center">
          <p className="text-3xl font-bold">FacultyPortal</p>
          <p className="text-slate-500 text-sm">Welcome to faculty portal !</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-slate-800">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
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

        <button className="bg-[#61BDF6] text-white p-4 py-3 rounded-md hover:opacity-90">
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
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { USER_API_BASE_URL } from '@/utils/constant';

import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/slices/authSlice';
import { Loader2 } from 'lucide-react';

function Signup() {
  const [inputData, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    file: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingVal = useSelector((state) => state.authSlice.loading);

  const setDataHandler = (e) => {
    setData({ ...inputData, [e.target.name]: e.target.value });
  }

  const setFileHandler = (e) => {
    setData({ ...inputData, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    let formData = new FormData;
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("phone", inputData.phone);
    formData.append("password", inputData.password);
    formData.append("role", inputData.role);
    if (inputData.file) {
      formData.append('file', inputData.file);
    }
    try {
      let registerUser = await axios.post(`${USER_API_BASE_URL}/register`, formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        },
        withCredentials: true,
      });

      if (registerUser.data.success) {
        navigate('/login');
        toast.success(registerUser.data.message);
      } else {
        toast.error(registerUser.data.message);
      }

    } catch (error) {
      dispatch(setLoading(true));
      console.log(error);
    }
    finally{
      dispatch(setLoading(false));
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full justify-center items-center">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="flex justify-center items-center">
              <span className="text-2xl font-bold text-black ">Job</span>
              <span className="text-2xl font-bold text-red-700">Dhundo</span>
              <span className="text-2xl font-semibold">.com</span>
            </div>
            <div className="div-2 justify-center items-center flex">
              <span className="text-lg font-bold text-slate-600">
                User Registration
              </span>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 bg-white"
                onChange={setDataHandler}
              />
            </div>


            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 bg-white"
                onChange={setDataHandler}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block font-medium text-gray-600"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your Number"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 bg-white"
                onChange={setDataHandler}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 bg-white"
                onChange={setDataHandler}
              />
            </div>

            <div className="div-profile flex justify-between items-center mt-4">
              <div className="div-1">
                <label htmlFor="profile" className='font-medium text-gray-600'>Profile</label>
              </div>
              <div className="w-72 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 bg-white">
                <input type="file" name="file" id="profileImage" className='cursor-pointer' accept='image/*' onChange={setFileHandler} />
              </div>
            </div>

            <div className="flex justify-evenly items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r1"
                  name="role"
                  value="Student"
                  onClick={setDataHandler}
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:before:content-[''] checked:before:w-2 checked:before:h-2 checked:before:bg-black checked:before:rounded-full checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 focus:ring-2 focus:ring-indigo-500 relative"

                />
                <label htmlFor="r1" className="ml-2">Student</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r3"
                  name="role"
                  value="Recruiter"
                  onClick={setDataHandler}
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:before:content-[''] checked:before:w-2 checked:before:h-2 checked:before:bg-black checked:before:rounded-full checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 focus:ring-2 focus:ring-indigo-500 relative"
                />
                <label htmlFor="r3" className="ml-2">Recruiter</label>
              </div>
            </div>

            {loadingVal ? <button
              type="submit"
              className="w-full py-3 bg-brown-600 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 bg-red-800 flex flex-row justify-center items-center gap-2"
            >
              <Loader2 className="h-4 w-4 font-bold animate-spin"></Loader2>
              Please wait
            </button> : <button
              type="submit"
              className="w-full py-3 bg-brown-600 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 bg-red-800"
            >
              Signup
            </button>}

            <div className="mt-4 flex justify-center">
              <span className="text-gray-600">
                Already a user?{" "}
                <Link to="/login" className="text-indigo-600 hover:underline">
                  Login here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup

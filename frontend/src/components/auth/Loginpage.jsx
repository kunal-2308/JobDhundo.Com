import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_BASE_URL } from "@/utils/constant";
import { toast } from "sonner";

function Loginpage() {
 let [inputData,setData] = useState({
  email:"",
  password:"",
  role:"",
 });

 let setChangeData = (e) =>{
  setData({...inputData,[e.target.name]:e.target.value})
 };

 let handleRoleChange = (e) => {
  setData({ ...inputData, role:e.target.value });
};

const navigate = useNavigate();

 let handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    let loginUser = await axios.post(`${USER_API_BASE_URL}/login`,inputData,{
      headers:{
        "Content-Type":'application/json',
      },
      withCredentials:true,
    });

    if(loginUser.data.success){
      navigate('/');
      toast.success(loginUser.data.message);
    }
    else{
      toast.error(loginUser.data.message);
    }

  } catch (error) {
    toast.error(error.response.data.message)
  }
 }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full justify-center items-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center">
              <span className="text-2xl font-bold text-black ">Job</span>
              <span className="text-2xl font-bold text-red-700">Dhundo</span>
              <span className="text-2xl font-semibold">.com</span>
            </div>
            <div className="div-2 justify-center items-center flex">
              <span className="text-lg font-bold text-slate-600">
                User Login
              </span>
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
                onChange={setChangeData}
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
                onChange={setChangeData}
              />
            </div>

            <div className="space-y-2">
              <RadioGroup defaultValue="comfortable" className="flex justify-evenly items-center my-2">

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                   name="role"
                   value="Student"
                    id="r1"
                    className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-indigo-600 checked:ring-2 checked:ring-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    onClick = {handleRoleChange}
                  />
                  <Label htmlFor="r1" className="text-base font-semibold text-slate-600">Student</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    name="role"
                    value="Recruiter"
                    id="r2"
                    className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-indigo-600 checked:ring-2 checked:ring-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    onClick = {handleRoleChange}
                  />
                  <Label htmlFor="r2" className="text-base font-semibold text-slate-600">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brown-600 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 bg-red-800"
            >
              Login
            </button>

            <div className="mt-4 flex justify-center">
              <span className="text-gray-600">
                New here?{" "}
                <Link to="/signup" className="text-indigo-600 hover:underline">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Loginpage;

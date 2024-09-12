import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/userLoggedInSlice";
function Navbar() {
  const status = useSelector((state)=>state.uLogin.status);

  const dispatch = useDispatch();

  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logoutUser());
  }
  return (
    <>
      <div className="bg-white flex justify-between items-center mx-auto h-16 max-w-full px-20 border-b-2 border-red-700">
        <div className="div-1">
          <span className="text-2xl font-bold text-black">Job</span>
          <span className="text-2xl font-bold text-red-700">Dhundo</span>
          <span className="text-2xl font-semibold">.com</span>
        </div>
        <div className="div-2 flex flex-row gap-16">
          <ul className="flex font-bold items-center gap-5 text-l">
            <Link to='/'><li className="cursor-pointer hover:border-b-2 border-red-700 text-black font-bold">Home</li></Link>
            <Link to='/jobs'><li className="cursor-pointer hover:border-b-2 border-red-700 text-black font-bold">Jobs</li></Link>
            <Link to='/browse'><li className="cursor-pointer hover:border-b-2 border-red-700 text-black font-bold">Browse</li></Link>
          </ul>
          {status &&  <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="min-w-70 mx-5 h-50">
              <div className="div-1-profile flex items-center justify-start gap-4 mx-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">Kunal Taware</p>
                  <p className="font-medium text-xs text-slate-600">Experienced React Developer</p>
                </div>
              </div>

              <div className="div-2-profile flex flex-col border-t-2 mt-3 justify-start">
                <div className="div-min-1 flex my-5 mx-4 gap-3">
                  <User2 className="text-slate-600" />
                  <span className="font-semibold text-slate-800 hover:border-b-2 border-red-700 cursor-pointer ">View Profile</span>
                </div>
                <div className="div-min-1 flex my-0 mx-4 gap-3">
                  <LogOut className="text-slate-600" /><span className="font-semibold text-slate-800  cursor-pointer hover:border-b-2 border-red-700" onClick={handleLogout}>Logout</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>}
          {!status && <Link to="/login"><Button className="bg-red-800 text-white hover:shadow-2x hover:bg-red-900 font-semibold">Login / Signup</Button></Link>}
         
        </div>
      </div>
    </>
  );
}

export default Navbar;

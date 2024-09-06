import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "@/components/ui/button"


function Navbar() {
  return (
    <>
      <div className="bg-white flex justify-between items-center mx-auto h-16 max-w-full px-20">
        <div className="div-1">
          <span className="text-2xl font-bold text-black">Job</span>
          <span className="text-2xl font-bold text-red-700">Dhundo</span>
          <span className="text-2xl font-semibold">.com</span>
        </div>
        <div className="div-2 flex flex-row gap-16">
          <ul className="flex font-bold items-center gap-5 text-l">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Jobs</li>
            <li className="cursor-pointer">Browse</li>
          </ul>
          <Popover>
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
                  <span className="font-semibold text-slate-700 hover:text-slate-600 cursor-pointer hover:underline">View Profile</span>
                </div>
                <div className="div-min-1 flex my-0 mx-4 gap-3">
                  <LogOut className="text-slate-600" /><span className="font-semibold text-slate-700 hover:text-slate-600 cursor-pointer hover:underline">Logout</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}

export default Navbar;

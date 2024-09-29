import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import axios from 'axios';
import { Mail, Pencil, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_BASE_URL } from '@/utils/constant';
import { updateUserDetails } from '@/redux/slices/userLoggedInSlice';
import { useNavigate } from 'react-router-dom';

function MainContainer() {
    const userData = useSelector((state) => state.uLogin.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    let [newupdatedUser, setUpdatedUser] = useState({
        name: userData?.name || "",
        email: userData?.email,
        bio: userData?.profile?.bio || "",
        phone: userData?.phone || "",
        skills: "",
        replaceSkills: false
    });

    // Checkbox setup:
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setUpdatedUser({ ...newupdatedUser, replaceSkills: event.target.checked });
    };

    // Describing onChange:
    let handleChange = (e) => {
        setUpdatedUser({ ...newupdatedUser, [e.target.name]: e.target.value });
    }

    let handleSubmit = async (e) => {
        /*
           1. Send request to bakcend to udpated this data .
           2. This will send the updated data as the response
           3. Now using this updated data send the dispatch request to frontend slices and update the localstorage
       */
        let response;
        try {
            e.preventDefault();
            response = await axios.patch(`${USER_API_BASE_URL}/profile/update`, newupdatedUser, {
                headers: {
                    "Content-Type": 'application/json',
                },
                withCredentials: true,
            });
            dispatch(updateUserDetails(response.data.user));
            navigate('/profile');
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="main-container-div lg:mt-16 flex justify-center items-center">
                <div className="parent-div-container bg-white sm:border-[3px] border-red-800 rounded-xl lg:w-[40%] p-10">
                    <div className="div-c1-main flex flex-row justify-between items-center">
                        <div className="div-c1-a-main flex lg:flex-row justify-center items-center lg:gap-x-5">
                            <Avatar className='mr-1'>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    className='lg:w-24 rounded-full object-cover'
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className="div-c1-a-content flex flex-col lg:gap-y-[3px]">
                                <span className='lg:text-2xl font-semibold'>{userData.name}</span>
                                <span className='lg:text-xs font-semibold text-slate-600 lg:w-[90%]'>{userData.profile.bio}</span>
                            </div>
                        </div>

                        <div className="div-c1-b-edit flex justify-start items-start lg:pr-5">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="div-icon-bg border-[1px] rounded-full lg:p-2 bg-red-800 hover:cursor-pointer text-white">
                                        <span><Pencil className='size-5' /></span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className='flex flex-col justify-center items-center lg:gap-y-6'>
                                            <div className="div-1">
                                                <span className="text-2xl font-bold text-black">Job</span>
                                                <span className="text-2xl font-bold text-red-700">Dhundo</span>
                                                <span className="text-2xl font-semibold">.com</span>
                                            </div>
                                            <div className="div-2 border-b-[3px] border-red-800">
                                                <span className='text-lg'>Edit Profile</span>
                                            </div>
                                        </DialogTitle>
                                        <DialogDescription />
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center justify-center gap-4 w-[90%]">
                                            <Label htmlFor="name" className="text-right">Name</Label>
                                            <Input id="name" name="name" value={newupdatedUser.name} className="col-span-3" onChange={handleChange} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4 w-[90%]">
                                            <Label htmlFor="email" className="text-right">Email</Label>
                                            <Input
                                                id="email"
                                                className="col-span-3"
                                                value={newupdatedUser.email}
                                                readOnly
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4 w-[90%]">
                                            <Label htmlFor="phone" className="text-right">Phone</Label>
                                            <Input id="phone" name="phone" value={newupdatedUser.phone} className="col-span-3" onChange={handleChange} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4 w-[90%]">
                                            <Label htmlFor="bio" className="text-right">Bio</Label>
                                            <Input id="bio" name="bio" value={newupdatedUser.bio} className="col-span-3" onChange={handleChange} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4 w-[90%]">
                                            <Label htmlFor="skills" className="text-right">Skills</Label>
                                            <Input id="skills" name="skills" value={newupdatedUser.skills} className="col-span-3" placeholder='Use comma to separate skills' onChange={handleChange} />
                                        </div>
                                        <div className="flex items-center space-x-2 justify-center pt-5">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                checked={isChecked}
                                                name='checked'
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Replace all skills
                                            </label>
                                        </div>
                                        <div className="flex justify-center items-center pt-5">
                                            <DialogFooter>
                                                <Button type="submit" className='bg-red-800 text-white hover:bg-red-800 font-semibold' onClick={handleSubmit}>Update Data</Button>
                                            </DialogFooter>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="contact-div-container w-[40%] flex flex-col justify-start items-start lg:mt-7 lg:pl-5 lg:gap-y-2">
                        <span className='font-extrabold text-base text-red-800'>CONTACT : </span>
                        <div className="mail-container flex justify-center items-center gap-x-2">
                            <span><Mail className='size-5 hover:cursor-pointer'></Mail></span>
                            <span className='lg:text-sm font-semibold text-black'>{userData.email}</span>
                        </div>
                        <div className="mail-container flex justify-center items-center gap-x-2">
                            <span><Phone className='size-5 hover:cursor-pointer'></Phone></span>
                            <span className='lg:text-sm font-semibold text-black'>{userData.phone}</span>
                        </div>
                    </div>
                    <div className="div-skills-container flex flex-col justify-start items-start lg:mt-7 lg:pl-5 lg:gap-y-3">
                        <span className='font-extrabold text-base text-red-800'>SKILLS :</span>
                        <div className="div-skills-section flex flex-wrap gap-x-2 gap-y-2">
                            {
                                userData.profile.skills.map((ele, index) => {
                                    return (
                                        <div className="div-1 flex justify-center items-center bg-red-800 p-3 rounded-full min-w-[80px] h-[30px] transition-transform duration-300 hover:scale-105 hover:cursor-pointer" key={index}>
                                            <span className='text-sm text-white font-medium'>{ele}</span>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="contact-div-container w-[40%] flex flex-col justify-start items-start lg:mt-7 lg:pl-5 lg:gap-y-1">
                        <span className='font-extrabold text-base text-red-800'>RESUME : </span>
                        <div className="mail-container flex justify-center items-center gap-x-2">
                            <span className='lg:text-xs font-bold text-black hover:text-blue-800 rounded-lg hover:cursor-pointer'>KunalTaware_Resume.pdf</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainContainer;

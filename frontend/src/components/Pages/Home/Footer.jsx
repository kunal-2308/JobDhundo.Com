import { CopyrightIcon, FacebookIcon, Instagram, InstagramIcon, TwitterIcon } from 'lucide-react'
import React from 'react'
import { Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <>
            <div className="footer-main-container border-t-[1px] border-slate-200 mt-28 flex justify-between items-center p-10">
                <div className="div-1-a w-max">
                    <div className='w-max'>
                        <span className="text-lg font-bold text-black">Job</span>
                        <span className="text-lg font-bold text-red-700">Dhundo</span>
                        <span className="text-lg font-semibold">.com</span>
                    </div>
                    <div className="w-max flex mt-1 gap-1 justify-center items-center">
                        <CopyrightIcon size='16px'></CopyrightIcon><span className='text-sm font-medium text-slate-600'>2024 DevInfoTech. All Rights Reserved.</span>
                    </div>
                </div>
                <div className="div-1-b w-max flex gap-5">
                <Link to='https://google.com'><FacebookIcon/></Link>
                <Link to='https://google.com'><InstagramIcon/></Link>
                <Link to='https://google.com'> <TwitterIcon/></Link>
                </div>
            </div>
        </>
    )
}

export default Footer

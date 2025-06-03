"use client";

import '../css/footer.css'

import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram, FaFacebookF, FaXTwitter, FaTelegram  } from 'react-icons/fa6';


const Footer = () => {
    return (
        <div className='justify-center bg-black pt-8'>
            <div className="flex mx-10 flex-wrap">
                <div className="w-1/3 min-w-50 flex flex-col items-center text-center mb-5">
                    <p className='max-w-100'>Organiziraš događaj, udruga si koja nudi tečaj, poslodavac koji traži radnike ili nešto drugo? Pritisni botun i prijavi se za oglašavanje.</p>
                    <button className='mt-5 h-10 w-50 rounded-3xl text-white bold bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600'>Prijavi se kao organizator</button>
                </div>
                <div className="w-1/3 min-w-50 flex flex-col items-center text-center">
                    <h1>Contact us</h1>
                    <div className='flex my-2'>
                        <a href="mailto:someone@example.com" target="_blank" rel="noopener noreferrer">
                            <MdEmail size={35} color="#FFFFFF" />
                        </a>
                        <strong className='pt-1 pl-2'>localive@gmail.com</strong>
                    </div>
                    <div className='flex'>
                        <a href="https://wa.me/996448804" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={35} color="#25D366" />
                        </a>
                        <strong className='pt-1 pl-2'>099 644 8804</strong>
                    </div>
                </div>
                <div className="w-1/3 min-w-50 flex flex-col items-center text-center">
                    <h1 className='pb-5'>Follow us</h1>
                    <div className="flex gap-2 align-center">
                        <a href="https://www.instagram.com/marasovick1" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={35} color="#E1306C" />
                        </a>

                        <a href="https://www.facebook.com/your_username" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF size={35} color="#1877F2" />
                        </a>

                        <a href="https://x.com/your_username" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter size={35} color="#FFFFFF" />
                        </a>

                        <a href="https://t.me/your_username" target="_blank" rel="noopener noreferrer">
                            <FaTelegram size={35} color="#0088cc" />
                        </a>
                    </div>
                </div>
            </div>
            <div className='bg-white h-0.5'></div>
            <p className='mt-3 text-center pb-3 text-l font-semibold'>@copyright2025</p>
        </div>
    )
}

export default Footer;
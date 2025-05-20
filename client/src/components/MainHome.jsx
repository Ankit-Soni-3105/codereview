import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const MainHome = () => {
    return (
        <>
            <div className="p-3">
                <Navbar />
                <div className="homeContent relative px-4 py-8 flex flex-col items-center h-[41.5vw] shadowBar mt-[1vw] rounded-[1vw]">
                    <p className="head text-xl text-[#696969] text-center mt-5 font-semibold tracking-tight leading-5">
                        AI Powered Code Plateform - with Our Group Review
                    </p>
                    <h1 className="headingAI text-5xl w-fit px-16 py-2 mt-2 shadow rounded-4xl font-bold mb-4 text-center leading-5 tracking-tight">
                        Meet AI Powered by
                        <span
                            className="text-[#0C29AB] font-extrabold text-5xl"
                        >
                            Code Review
                        </span>
                    </h1>
                    {/* <p
                className="para text-[#000] text-xl px-[18vw] text-center mt-1 font-semibold tracking-tight leading-6"
            >Your visualizations and code are now empowered by AI, transforming your ideas into fully scalable solutions while intelligently analyzing your code to resolve complex problems with precision.</p> */}
                    <div className="flex gap-[8vw] absolut bottom-5">
                        <Link
                            to="/room-creation"
                            className="bg-[#0C29AB] shadowBarbut text-white py-3 mt-10 px-12 rounded-4xl hover:bg-blue-600 transition duration-200 flex gap-2 font-bold text-xl">
                            Start Build your Review
                            <i className="ri-arrow-right-long-line"></i>
                        </Link>
                    </div>

                    {/* <div className="h-1/2 w-full bg-amber-500 flex flex-wrap flex-row gap-4 justify-center items-center">
                <div className="logoAi h-[12vw] w-[12vw] border rounded-full flex justify-center items-center">ai</div>
                <div className="logoAi h-[12vw] w-[12vw] border rounded-full flex justify-center items-center">ai</div>
                <div className="logoAi h-[12vw] w-[12vw] border rounded-full flex justify-center items-center">ai</div>
                <div className="logoAi h-[12vw] w-[12vw] border rounded-full flex justify-center items-center">ai</div>
                <div className="logoAi h-[12vw] w-[12vw] border rounded-full flex justify-center items-center">ai</div>
            </div> */}
                    {/* <div className="flex gap-[8vw] absolute bottom-5">
                <Link
                to="/get-review-code"
                    className="bg-[#24CFA6] shadowBarbut text-white py-2 px-8 rounded hover:bg-blue-600 transition duration-200">
                    Get Started
                </Link>
                <button className="bg-[#36c2a2] shadowBarbut text-white py-2 px-8 rounded hover:bg-gray-600 transition duration-200">Learn More</button>
            </div> */}
                </div>
            </div>
        </>
    )
}

export default MainHome
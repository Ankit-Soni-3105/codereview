import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar px-4 py-2 text-black rounded-[1.8vw]">
            <div className="flex justify-between items-center">
                <div className="px-4 py-1 flex items-center">
                    {/* <img src="/logo.png" alt="" className="h-12 w-12 mr-2 border rounded-full" /> */}
                    <h1 className="text-lg font-bold">AI Code Review</h1>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-black focus:outline-none"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Desktop navigation */}
                <nav className="hidden md:flex gap-16">
                    <button className="text-xl font-bold hover:text-gray-400">Home</button>
                    <button className="text-xl font-bold hover:text-gray-400">Dashboard</button>
                    <button className="text-xl font-bold hover:text-gray-400">Explore</button>
                    <button className="text-xl font-bold hover:text-gray-400">About</button>
                </nav>
            </div>

            {/* Mobile navigation */}
            {isOpen && (
                <nav className="md:hidden mt-4 flex flex-col space-y-4">
                    <button className="text-xl font-bold hover:text-gray-400 py-2">Home</button>
                    <button className="text-xl font-bold hover:text-gray-400 py-2">Dashboard</button>
                    <button className="text-xl font-bold hover:text-gray-400 py-2">Explore</button>
                    <button className="text-xl font-bold hover:text-gray-400 py-2">About</button>
                </nav>
            )}
        </div>
    )
}

export default Navbar
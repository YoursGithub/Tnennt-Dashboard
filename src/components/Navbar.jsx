import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    }

    return (
        <>
            <nav className="bg-[#141519] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="px-4 text-gray-500 dark:text-gray-200 focus:outline-none focus:text-gray-700 lg:hidden"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center">
                            {searchVisible && (
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="mr-2 p-2 rounded-md bg-gray-700 text-white"
                                />
                            )}
                            <button 
                                onClick={toggleSearch}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:shadow-outline"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            <Link to="/reports">
                                <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:shadow-outline">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                </button>
                            </Link>

                            

                            <div className="ml-4 relative flex-shrink-0">
                                <div>
                                    <button className="bg-gray-800 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://via.placeholder.com/150"
                                            alt="User profile"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
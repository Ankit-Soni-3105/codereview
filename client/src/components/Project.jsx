import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Project = () => {
    const [projectName, setProjectName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:4000/project/create-project", {
            projectName,
            password
        }).then((res) => {
            // console.log(res.data )
            navigate("/")
        }
        ).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="relative parant h-screen flex justify-center px-5 items-center">

            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Project Form
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="projectName"
                        className="block text-sm font-medium">
                        Project Name
                    </label>
                    <input
                        onChange={(e) => setProjectName(e.target.value)}
                        value={projectName}
                        type="text"
                        id="projectName"
                        name="projectName"
                        placeholder="Enter Project Name"
                        className="mt-1 text-[#24CFA6] block w-full px-3 py-2 border border-[#24CFA6] rounded-xl shadow-sm focus:outline-none focus:border-blue-200 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium">
                        Unique Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Room Unique Password"
                        className="mt-1 text-[#24CFA6] block w-full px-3 py-2 border border-[#24CFA6] rounded-xl shadow-sm focus:outline-none focus:border-blue-200 sm:text-sm"
                    />
                </div>

                <div className="w-full flex gap-5 justify-end items-center mt-4">
                    <button 
                    onClick={() => navigate("/")}
                    className='bg-[#24CFA6] text-black font-bold py-2 px-4 rounded-xl hover:bg-[#b5ffee] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-ful bg-[#24CFA6] text-black font-bold py-2 px-4 rounded-xl hover:bg-[#b5ffee] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Project
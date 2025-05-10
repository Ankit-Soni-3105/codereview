import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [authForm, setAuthForm] = useState({
        memberName: '',
        password: ''
    });
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("https://ai-code-review-2xol.onrender.com/project/get-all")
            .then((res) => {
                setProjects(res.data)
            }
            ).catch((err) => {
                console.log(err)
            })
    }, [])

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    }

    const handleDeleteProject = async (project, e) => {
        e.stopPropagation();
        try {
            const response = await axios.delete("https://ai-code-review-2xol.onrender.com/project/delete-room", {
                data: { projectName: project.projectName }
            });
            if (response.status === 200) {
                // Remove the deleted project from state
                setProjects(projects.filter(p => p.projectName !== project.projectName));
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.msg || 'Failed to delete room');
        }
    }

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://ai-code-review-2xol.onrender.com/project/join-room", {
                name: selectedProject.projectName,
                password: authForm.password,
                member: authForm.memberName,
                projectName: selectedProject.projectName // Adding projectName to the request
            });

            if (response.status === 200) {
                setShowModal(false);
                navigate(`/project/${selectedProject._id}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.msg || 'Failed to authenticate');
        }
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <div className="homeSection w-full h-screen md:min-h-[47.8vw] bg-cover bg-center bg-no-repeat">
                    <div className={`upperBox h-full `}>
                        <div className="px-8 py-4 ">
                            <h1 className='text-[#24CFA6] font-medium text-2xl'>
                                Rooms
                            </h1>
                        </div>
                        <div className="button p-8">
                            <button
                                onClick={() => {
                                    navigate('/project-create')
                                }}
                                className='px-6 py-4 bg-[#24CFA6] text-black font-bold cursor-pointer rounded-xl'>
                                Create Your New Room
                            </button>

                            <div className="allporj flex flex-col items-center mt-2 border-2 border-[#24CFA6] rounded-xl p-4">
                                <h2 className='text-2xl font-semibold'>
                                    All Rooms
                                </h2>
                                <div className="projects">

                                    {projects.length == 0 ? <div>
                                        <p>No Created any Rooms</p>
                                    </div> : <div className="porject mt-5 flex flex-col items-center gap-2 justify-center">
                                        {projects.map((project, idx) => {
                                            return (
                                                <div className='flex gap-3 relative items-center' key={idx}>
                                                    <div
                                                        key={idx}
                                                        onClick={() => handleProjectClick(project)}
                                                        className="text-xl cursor-pointer px-8 py-1 uppercase bg-[#3B3B3F] rounded-lg" >
                                                        {project.projectName}
                                                    </div>
                                                    <div
                                                        className="roomDelete cursor-pointer relative uppercase rounded-full"
                                                        onClick={(e) => handleDeleteProject(project, e)} >
                                                        <i className="del px-2 py-1 bg-[#3B3B3F] rounded-full ri-delete-bin-4-line absolute text-whitef"></i>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Authentication Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black px-5 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1F1F23] p-8 rounded-xl border-2 border-[#24CFA6] w-96">
                        <h3 className="text-xl font-semibold mb-4 text-[#24CFA6]">
                            Join Room in {selectedProject?.projectName}
                        </h3>
                        <form onSubmit={handleAuthSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#24CFA6] mb-1">Project Name</label>
                                <input
                                    type="text"
                                    value={selectedProject?.projectName || ''}
                                    className="w-full p-2 bg-[#3B3B3F] rounded-lg text-white"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#24CFA6] mb-1">
                                    Member Name
                                </label>
                                <input
                                    type="text"
                                    value={authForm.memberName}
                                    onChange={(e) => setAuthForm(prev => ({ ...prev, memberName: e.target.value }))}
                                    className="w-full p-2 bg-[#3B3B3F] rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#24CFA6] mb-1">Password</label>
                                <input
                                    type="password"
                                    value={authForm.password}
                                    onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                                    className="w-full p-2 bg-[#3B3B3F] rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div className="flex gap-2 justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-[#3B3B3F] text-white rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#24CFA6] text-black font-bold rounded-lg"
                                >
                                    Join Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [authForm, setAuthForm] = useState({
        memberName: '',
        password: ''
    });
    const navigate = useNavigate()

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
            alert(error.response?.data?.msg || 'Failed to Authenticate');
        }
    }

    return (
        <>

            <div className="shadowBar w-fit mt-16 py-2 px-4 rounded-xl">
                <div className="text-xl font-semibold flex gap-4 flex-wrap">
                    <h1>Create a New Room</h1>
                    <i>three</i>
                </div>
                <div className="buttonn flex flex-wrap justify-end">
                    <button
                        onClick={() => {
                            navigate('/project-create')
                        }}
                        className='bg-[#24CFA6] shadowBarbut text-white py-2 px-8 rounded hover:bg-blue-600 transition duration-200 mt-8'
                    >
                        Create
                    </button>
                </div>
            </div>

            {/* Authentication Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black px-5 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1F1F23] shadowBar p-8 rounded-xl border-2 border-[#24CFA6] w-96">
                        <h3 className="text-xl font-semibold mb-4 text-[#24CFA6]">
                            Join Room in {selectedProject?.projectName}
                        </h3>
                        <form onSubmit={handleAuthSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#24CFA6] mb-1">
                                    Project Name
                                </label>
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

export default CreateRoom
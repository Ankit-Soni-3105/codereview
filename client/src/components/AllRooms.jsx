import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllRooms = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [authForm, setAuthForm] = useState({
    memberName: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ai-code-review-2xol.onrender.com/project/get-all")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDeleteProject = async (project, e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        "https://ai-code-review-2xol.onrender.com/project/delete-room",
        {
          data: { projectName: project.projectName },
        }
      );
      if (response.status === 200) {
        // Remove the deleted project from state
        setProjects(
          projects.filter((p) => p.projectName !== project.projectName)
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Failed to delete room");
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ai-code-review-2xol.onrender.com/project/join-room",
        {
          name: selectedProject.projectName,
          password: authForm.password,
          member: authForm.memberName,
          projectName: selectedProject.projectName, // Adding projectName to the request
        }
      );

      if (response.status === 200) {
        setShowModal(false);
        navigate(`/project/${selectedProject._id}`);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Failed to Authenticate");
    }
  };

  return (
    <>
      <div className="mt-10 shadowBar p-4 rounded-xl">
        <div className="">
          <h1 className="px-8 py-2 font-bold shadowBarbut w-fit rounded-lg">
            All Room
          </h1>

          <div className="flex flex-col items-cente p-4 mt-2 border-2 border-[#24CFA6] bg-amber500 rounded-xl ">
            <div className="projects">
              {projects.length == 0 ? (
                <div>
                  <p className="text-xl font-bold">No Created any Rooms</p>
                </div>
              ) : (
                <div className="py-2 flex flex-wrap gap-2">
                  {projects.map((project, idx) => {
                    return (
                      <div
                        className="flex flex-col shadowBarbut rounded-xl px-4 py-2"
                        key={idx}
                      >
                        <div className="flex gap- items-center">
                          <div
                            key={idx}
                            onClick={() => handleProjectClick(project)}
                            className="text-xl cursor-pointer px-8 py-1 shadowBarbut font-bold uppercase bg-[#fff] rounded-lg"
                          >
                            {project.projectName}
                          </div>
                          <div
                            className="roomDelet cursor-pointer relative uppercase rounded-full"
                            onClick={(e) => handleDeleteProject(project, e)}
                          >
                            <i className="p-2 bg-[#3B3B3F] rounded-full ri-delete-bin-4-line absolut text-white"></i>
                          </div>
                        </div>
                        <button className="bg-[#08604c] shadowBarbut text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200 mt-8">
                          Explore
                        </button>

                      </div>
                    );
                  })}
                </div>
              )}
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
                <label className="block text-sm font-medium text-[#24CFA6] mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={selectedProject?.projectName || ""}
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
                  onChange={(e) =>
                    setAuthForm((prev) => ({
                      ...prev,
                      memberName: e.target.value,
                    }))
                  }
                  className="w-full p-2 bg-[#3B3B3F] rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#24CFA6] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
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
  );
};

export default AllRooms;

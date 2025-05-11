import React from 'react'
import { BrowserRouter as AppRouter, Routes as AppRoutes, Route } from 'react-router-dom'
import Home from '../components/Home'
import ProjectPge from '../components/Project'
import ProjectUi from '../components/ProjectUi'
import VersionControll from '../components/VersionControll'
import VideoCall from '../components/VideoCall'

const Project = () => {
    return (
        <AppRouter>
            <AppRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/project-create" element={<ProjectPge/>} />
                <Route path="/project/:id" element={<ProjectUi />} />
                <Route path="/project/version" element={<VersionControll />} />
                <Route path="/project/video-call" element={<VideoCall />} />
            </AppRoutes>
        </AppRouter>
    )
}

export default Project
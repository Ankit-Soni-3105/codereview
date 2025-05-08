import { createProject, getAllProjects } from '../services/project.service.js';
import projectModel from '../models/project.model.js';
import bcrypt from "bcrypt"


export const createRoomcontroller = async (req, res) => {
    const { projectName, password } = req.body;
    // console.log(password)
    try {
        const existing = await projectModel.findOne({ projectName });
        // console.log(existing)
        if (existing)
            return res.status(400).json({ msg: "Room already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const room = new projectModel({
            projectName,
            password: hashedPassword
        });
        await room.save();
        res.status(201).json({ msg: "Room created successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err.message });
    }
}


export const deleteRoom = async (req, res) => {
    const { projectName } = req.body;
    try {
        const room = await projectModel.findOneAndDelete({ projectName });
        if (!room) return res.status(404).json({ msg: "Room not found" });
        res.status(200).json({ msg: "Room deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}


export const joinRoom = async (req, res) => {
    const { projectName, password, member } = req.body;
    try {
        const room = await projectModel.findOne({ projectName });
        if (!room) return res.status(404).json({ msg: "Room not found" });

        const match = await bcrypt.compare(password, room.password);
        if (!match) return res.status(401).json({ msg: "Incorrect password" });

        if (!room.members.includes(member)) {
            room.members.push(member);
            await room.save();
        }

        res.status(200).json({ msg: "Joined successfully", members: room.members });
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err.message });
    }
};

export const getAllProjectsController = async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
import projectModel from '../models/project.model.js';
import bcrypt from "bcrypt"

export const createProject = async (projectName, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const project = await projectModel.create({
            name: projectName,
            password: hashedPassword
        });
        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export const getAllProjects = async () => {
    try {
        const projects = await projectModel.find();
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
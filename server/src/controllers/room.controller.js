import roomModel from "../models/room.model.js";
import bcrypt from "bcrypt"

export const createRoom = async (req, res) => {
    const { name, password } = req.body;
    try {
        const existing = await roomModel.findOne({ name });
        if (existing)
            return res.status(400).json({ msg: "Room already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const room = new roomModel({ name, password: hashedPassword });
        await room.save();
        res.status(201).json({ msg: "Room created successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const joinRoom = async (req, res) => {
    const { name, password, member } = req.body;
    try {
        const room = await roomModel.findOne({ name });
        console.log(room);
        if (!room) return res.status(404).json({ msg: "Room not found" });

        const match = await bcrypt.compare(password, room.password);
        if (!match) return res.status(401).json({ msg: "Incorrect password" });

        if (!room.members.includes(member)) {
            room.members.push(member);
            await room.save();
        }

        res.status(200).json({ msg: "Joined successfully", members: room.members });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const searchRoom = async (req, res) => {
    const { query } = req.query;
    try {
        const rooms = await roomModel.find({
            name: new RegExp(query, 'i')
        });
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


export const deleteRoom = async (req, res) => {
    const { name } = req.body;
    try {
        const room = await roomModel.findOneAndDelete({ name });
        if (!room) return res.status(404).json({ msg: "Room not found" });
        res.status(200).json({ msg: "Room deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
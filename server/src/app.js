import express from 'express';
// import aiRoutes from './routes/ai.routes.js';
import projectRoutes from './routes/project.routes.js';
import roomRoutes from './routes/room.routes.js'
import morgan from "morgan"


import cors from 'cors';

const app = express();


// Middleware to parse JSON request bodies
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/project', projectRoutes);
app.use('/rooms', roomRoutes)
// app.use('/ai', aiRoutes)

export default app;
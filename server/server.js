import app from '../server/src/app.js';
import 'dotenv/config';
import http from 'http';
import connectdb from './src/db/db.js';
import { Server as SocketServer } from 'socket.io';
import messageModel from './src/models/message.model.js';
import cors from 'cors';
import projectModel from './src/models/project.model.js';
import { getReview } from './src/services/ai.service.js';


const port = process.env.PORT;
connectdb();

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('A new Client connected:');

  const project = socket.handshake.query.project
  socket.join(project);


  socket.on('disconnect', () => {
    console.log('User disconnected:');
  });

  socket.on("chat-history", async () => {
    const messages = await messageModel.find({ project: project }).sort({ createdAt: -1 }).limit(10).exec();
    socket.emit("chat-history", messages.reverse())
  })

  socket.on("get-code", async () => {
    const projectData = await projectModel.findById(project).select("code").exec();
    socket.emit("get-code", projectData.code)
  });

  socket.on('chat-message', async (message) => {
    socket.broadcast.to(project).emit('chat-message', message);
    await messageModel.create({
      project: project,
      text: message
    });
  });

  socket.on('code-change', async (code) => {
    socket.broadcast.to(project).emit('code-change', code);
    await projectModel.findByIdAndUpdate({ _id: project }, {
      code: code
    });
  });

  socket.on("get-review", async (code) => {
    const review = await getReview(code);
    socket.emit("code-review", review);
  });
});


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
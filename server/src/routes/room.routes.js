import { Router } from "express"
import { createRoom, joinRoom, searchRoom, deleteRoom } from '../controllers/room.controller.js'

const router = Router();


router.post('/createroom', createRoom);
router.post('/joinroom', joinRoom);
router.get('/search', searchRoom);
router.delete('/deleteroom', deleteRoom);

export default router

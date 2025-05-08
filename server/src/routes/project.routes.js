import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";

const router = Router();

router.post(
    '/create-project',
    projectController.createRoomcontroller
);

router.post(
    '/join-room',
    projectController.joinRoom
)
router.delete(
    '/delete-room',
    projectController.deleteRoom
);  
router.get(
    '/get-all',
    projectController.getAllProjectsController
);

export default router;
import express from "express";
import { userController } from "../controllers/UserController.js";
import { verifyToken, checkRole } from '../middewares/authentication.js';

export const userRoutes = express.Router();

userRoutes.post('/register', userController.register);
userRoutes.get('/all', verifyToken, checkRole(["admin"]), userController.getAllUsers);
userRoutes.get('/:id', verifyToken, checkRole(["admin"]), userController.getUserById);
userRoutes.put('/:id', verifyToken, checkRole(["admin", "registered"]), userController.updateUserById);
userRoutes.delete('/:id', verifyToken, checkRole(["admin"]), userController.deleteUserById);

userRoutes.get('/read/one', verifyToken, userController.getOneUser);

export default userRoutes;
import express from 'express'
import { orderController } from '../controllers/OrderController.js'
import { verifyToken, checkRole } from '../middewares/authentication.js'

const orderRoutes = express.Router()

orderRoutes.post('/create', verifyToken, checkRole(["admin", "registered"]), orderController.createOrder)

orderRoutes.get('/read', verifyToken, checkRole(["admin"]), orderController.getAllOrders)

orderRoutes.get('/read/:id', verifyToken, checkRole(["admin"]),  orderController.getOrderById)

orderRoutes.get('/byUserId', verifyToken, checkRole(["admin"]), orderController.getOrdersByUser)

orderRoutes.patch('/update/:id',verifyToken, checkRole(["admin", "registered"]), orderController.updateOrder)

orderRoutes.delete('/delete/:id',verifyToken, checkRole(["admin"]), orderController.deleteOrder)

export default orderRoutes
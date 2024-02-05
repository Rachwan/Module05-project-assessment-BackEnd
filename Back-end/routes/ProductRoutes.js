import express from "express"
import { productController } from "../controllers/ProductController.js"
import { verifyToken, checkRole } from '../middewares/authentication.js'
import uploadImage from "../middewares/multer.js";

const productRoutes= express.Router()

productRoutes.post('/create', verifyToken, checkRole(["admin"]), uploadImage.single("image"), productController.createProduct)

productRoutes.put('/update/:id', verifyToken, checkRole(["admin"]), uploadImage.single("image"),productController.editProduct)

productRoutes.get('/getone/:id', productController.getProductById)

productRoutes.get('/read/all', productController.getProducts)

productRoutes.delete('/delete/:id', verifyToken, checkRole(["admin"]), productController.deleteProduct)



export default productRoutes;
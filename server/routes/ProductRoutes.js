import express from 'express'
import { upload } from '../configs/Multer.js'
import authSeller from '../middleware/AuthSeller.js'

import { addPorduct } from '../controllers/ProductController.js'

import { changeStock, productById, productList } from '../controllers/ProductController.js'

const productRouter = express.Router()


productRouter.post('/add', upload.array(["images"]), authSeller, addPorduct)

productRouter.get('/list', productList)
productRouter.get('/id', productById)
productRouter.post('/stock', authSeller, changeStock)


export default productRouter
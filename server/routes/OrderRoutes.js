import express from 'express'
import authUser from '../middleware/AuthUser.js'
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/OrderController.js'
import authSeller from '../middleware/AuthSeller.js'

const orderRouter = express.Router()


orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)


export default orderRouter;
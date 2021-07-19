import express from 'express'

import { createPizza, getOrder, getOrders, getPizzas, createOrder } from '../controllers/api'

const router = express.Router()

router.post('/order', createOrder)

router.get('/order', getOrders)

router.get('/order/:id', getOrder)

// router.put('/order/:id', ...)

router.post('/pizza', createPizza)

router.get('/pizzas', getPizzas)

export { router as apiRoutes }
import express, { NextFunction, Request } from 'express'

import Pizza from '../models/pizza'
import Order from '../models/order'
import OrderItem from '../models/order-item'

export interface PizzaData {
  pizzaId: string
  quantity: number
}

export const createOrder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { pizzaId, quantity } = req.body
  try {
    const pizza = await Pizza.findById(pizzaId)
    if (!pizza) {
      const error = new Error('Pizza not found')
      // @ts-ignore
      error.statusCode = 404
      throw error
    }
    const orderItem = await new OrderItem({
      pizza,
      quantity
    })
    await orderItem.save()
    const order = await new Order({
      orderItems: [orderItem]
    })
    await order.save()
    // @ts-ignore
    res.status(201).json({
      message: 'Order created successfully!',
      order,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
};

export const getOrders = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orders = await Order.find().populate({
      path: 'orderItems',
      populate: {
        path: 'pizza',
      }
    })
    // @ts-ignore
    res.status(200).json({
      message: 'Fetched orders successfully.',
      orders,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const getOrder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params
  try {
    const order = await Order.findById(id).populate({
      path: 'orderItems',
      populate: {
        path: 'pizza',
      }
    })
    if (!order) {
      const error = new Error('Order not found')
      // @ts-ignore
      error.statusCode = 404
      throw error
    }
    // @ts-ignore
    res.status(200).json({
      message: 'Fetched order successfully.',
      order,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const createPizza = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { name, price } = req.body
  const pizza = new Pizza({
    name,
    price,
  })
  try {
    await pizza.save()
    // @ts-ignore
    res.status(201).json({
      message: 'Pizza created successfully!',
      pizza,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const getPizzas = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const pizzas = await Pizza.find()
    // @ts-ignore
    res.status(200).json({
      message: 'Fetched pizzas successfully.',
      pizzas,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}


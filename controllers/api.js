import Pizza from '../models/pizza.js'
import Order from '../models/order.js'
import OrderItem from '../models/order-item.js';

export const createOrder = async (req, res, next) => {
  const { pizzaId, quantity } = req.body
  try {
    const pizza = await Pizza.findById(pizzaId)
    if (!pizza) {
      const error = new Error('Pizza not found')
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

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({ 
      path: 'orderItems',
      populate: {
        path: 'pizza',
      } 
    })
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

export const getOrder = async (req, res, next) => {
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
      error.statusCode = 404
      throw error
    }
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

export const createPizza = async (req, res, next) => {
  const { name, price } = req.body
  const pizza = new Pizza({
    name,
    price,
  })
  try {
    await pizza.save()
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

export const getPizzas = async (req, res, next) => {
  try {
    const pizzas = await Pizza.find()
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


# Ambulnz Backend Challenge

This is a solution to the [Ambulnz Backend Challenge](https://github.com/AmbulnzLLC/fullstack-challenge/tree/master/backend).

How to run
-------------
* `npm install`
* Create a `nodemon.json` file and add `MONGO_URL` variable
* `npm start`

Stack
-------------
* Node.js / Express
* MongoDB / Mongoose

Project Description
-------------
* models:
  * pizza
  * order item (related to pizza)
  * order (related to order item)
* endpoints:
  * `POST /api/order` (create order)
  * `GET /api/order` (list orders)
  * `GET /api/order/:id` (details of an individual order)
  * `POST /api/pizza` (create pizza)
  * `GET /api/pizzas` (list pizzas)

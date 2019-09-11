const conn = require('../configs/db')
const model = require('../models/productsModel')



exports.getProducts = (req, res, next) => {
  const limit = req.limit
  const offset = req.offset
  const sortBy = req.query.sortBy || 'updated_at'
  const sort = req.query.sort || 'DESC'
  const search = req.query.search ? `%${req.query.search}%` : '%%'

  const data = {sortBy, sort, limit, offset, search}

  model.getDatas(data)
    .then(result => {
      if (result.length > 0) {
        res.json({
          status: 200,
          error: false,
          page: req.query.page,
          data: result[0],
          total: result[1]
        })
      } else {
        const err = new Error
        err.status = 404
        err.message = 'Products not found'
        next(err);
      }
    })
    .catch(err => {
      err.status = 400
      err.message = 'Products not found'
      next(err);
    })
}



exports.getProduct = (req, res, next) => {
  model.getData(req.params.id)
    .then(result => {
      if (result.length > 0) {
        res.json({
          status: 200,
          error: false,
          data: result
        })
      } else {
        const err = new Error
        err.status = 404
        err.message = 'Products not found'
        next(err);
      }
    })
    .catch(err => {
      err.status = 400
      err.message = 'Products not found'
      next(err);
    })
}



exports.createProduct = (req, res, next) => {
  const {name, description, image, id_category} = req.body;

  const quantity = Number(req.body.quantity);

  if (!name || !description|| !image|| !id_category|| !quantity) {
    res.json({
      status: 400,
      message: 'Name, description, image, category, and quantity are required'
    })
  }

  const data = {
    name, description, image, id_category, quantity, created_at: new Date, updated_at: new Date
  }

  model.createData(data)
    .then(result => res.json({
      status: 201,
      error: false,
      message: `Success to create product`,
      id: result.insertId,
      data
    }))
    .catch(err => res.json({
      status: 400,
      message: 'Failed to create product'
    }))
}



exports.updateProduct = (req, res, next) => {
  const {name, description, image, id_category, quantity} = req.body;

  if (!name || !description|| !image|| !id_category|| !quantity) {
    const err = new Error
      err.status = 400
      err.message = 'Name, description, image, category, and quantity are required'
      next(err)
  }

  const data = {
    name, description, image, id_category, quantity, updated_at: new Date
  }

  model.updateData(data, req.params.id)
    .then(result => res.json({
      status: 200,
      error: false,
      message: `Success to update product with id ${req.params.id}`,
      data
    }))
    .catch(err => {
      err.status = 400
      err.message = `Failed to update product with id ${req.params.id}`
      next(err);
    })
}



exports.addOrReduceQuantity = (req, res, next) => {
  if (isNaN(Number(req.body.by)) === true && typeof req.body.by != 'undefined') {
    const err = new Error
    err.status = 400
    err.message = 'Wrong insert value'
    next(err)
  }

  const action = req.body.action
  const by = parseInt(req.body.by) || 1

  if (!action) {
    const err = new Error
      err.status = 400
      err.message = 'Action is required'
      next(err)
  }

  const data = {action, by, updated_at: new Date()}

  model.addOrReduce(data, req.params.id)
    .then(result => res.json({
      status: 200,
      error: false,
      id: req.params.id,
      action,
      message: `Success to ${action} product quantity by ${by} with id ${req.params.id}`,
      updated_at: new Date()
    }))
    .catch(err => next(err))
}



exports.deleteProduct = (req, res, next) => {
  model.deleteData(req.params.id)
    .then(result => res.json({
      status: 200,
      error: false,
      id: req.params.id,
      message: `Success to delete product with id ${req.params.id}`
    }))
    .catch(err => {
      err.status = 400
      err.message = `Failed to delete product with id ${req.params.id}`
      next(err)
    })
}
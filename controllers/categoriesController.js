const conn = require('../configs/db');
const model = require('../models/categoriesModel')



exports.getCategories = (req, res, next) => {
  model.getDatas()
    .then(result => {
      if (result.length > 0) {
        res.json({
          status: 200,
          error: false,
          data: result,
          total: result.length
        })
      } else {
        const err = new Error
        err.status = 404
        err.message = 'Category not found'
        next(err);
      }
    })
    .catch(err => {
      err.status = 400
      err.message = 'Category not found'
      next(err);
    })
}



exports.getCategory = (req, res, next) => {
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
        err.message = 'Category not found'
        next(err);
      }
    })
    .catch(err => {
      err.status = 400
      err.message = 'Category not found'
      next(err);
    })
}



exports.createCategory = (req, res, next) => {
  if (!req.body.name) {
    const err = new Error
    err.status = 400
    err.message = 'Name is required'
    next(err)
  }

  const data = {
    name: req.body.name,
    created_at: new Date(),
    updated_at: new Date()
  }

  model.createData(data)
    .then(result => res.json({
      status: 201,
      error: false,
      message: `Success to create category`,
      id: result.insertId,
      data
    }))
    .catch(err => {
      err.status = 400
      err.message = `Failed to create category`
      next(err);
    })
}

exports.updateCategory = (req, res, next) => {
  if (!req.body.name) {
    const err = new Error
      err.status = 400
      err.message = 'Name is required'
      next(err)
  }

  const data = {
    name: req.body.name,
    updated_at: new Date()
  }

  model.updateData(data, req.params.id)
    .then(result => res.json({
      status: 200,
      error: false,
      message: `Success to update category with id ${req.params.id}`,
      data
    }))
    .catch(err => {
      err.status = 400
      err.message = `Failed to update category with id ${req.params.id}`
      next(err);
    })
}

exports.deleteCategory = (req, res, next) => {
  model.deleteData(req.params.id)
    .then(result => res.json({
      status: 200,
      error: false,
      message: `Success to delete category with id ${req.params.id}`
    }))
    .catch(err => {
      err.status = 400
      err.message = `Failed to delete category with id ${req.params.id}`
      next(err)
    })
}


const conn = require('../configs/db');

exports.getCategories = (req, res) => {
  conn.query('SELECT * FROM categories', (err, rows) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: true,
        message: 'Category Not Found'
      })
    } else {
      res.status(200).json({
        status: 200,
        error: false,
        data: result
      });
    }
  })
}

exports.getCategory = (req, res) => {
  conn.query('SELECT * FROM categories WHERE id = ?', req.params.id, (err, row) => {
    if (err) {
      res.status(500).json({
        status: 500,
        error: true,
        message: 'Internal Server Error'
      })
    } else {
      if (result.length > 0) {
        console.log(result)
        res.status(200).json({
          status: 200,
          error: false,
          data: result
        });
      } else {
        res.status(400).json({
          status: 400,
          error: true,
          message: `Category with id ${req.params.id} not found`
        })
      }
    }
  })
}

exports.createCategory = (req, res) => {
  const {name} = req.body
  const time = new Date();

  if (!name) {
    res.status(300).json({
      status: 300,
      message: 'Name is needed'
    })
  }

  conn.query('INSERT INTO categories name VALUES ?', name, (err, result) => {
    if (err) {
      res.status(500).json({
        status: 500,
        error: true,
        message: 'Failed to create category'
      })
    } else {
      res.status(200).json({
        status: 200,
        error: false,
        message: 'Success creating category',
        data: [
                { 
                  "id": result.insertedId,
                  "name" : req.body,
                  "date_added": time, 
                  "date_updated": time
                }
              ]
      });
    }
  })
}

exports.updateCategory = (req, res) => {
  const {name} = req.body
  const time = new Date();

  if (!name) {
    res.status(300).json({
      status: 300,
      message: 'Name is needed!'
    })
  }
  conn.query('UPDATE categories SET name = ?, date_added = date_added, date_updated = ? WHERE id = ?', [name, time, req.params.id], (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: true,
        message: `Failed to update category with id ${req.params.id}`
      })
    } else {
      res.status(200).json({
        status: 200,
        error: false,
        message: `Success updating category with id ${req.params.id}`,
        data: result
      });
    }
  })
}

exports.deleteCategory = (req, res) => {
  conn.query('DELETE FROM categories WHERE id = ?', req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: true,
        message: `Failed to delete category with id ${req.params.id}`
      })
    } else {
      res.status(200).json({
        status: 200,
        error: false,
        message: `Success deleting category with id ${req.params.id}`,
        data: result
      });
    }
  })
}


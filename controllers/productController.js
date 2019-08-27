const conn = require('../configs/db');

exports.getProducts = (req, res) => {
  const sortBy = req.query.sortBy || 'id';
  const sort = req.query.sort || 'ASC';
  const limit = parseInt(req.query.limit) || 4;
  const page = (parseInt(req.query.page) - 1) * limit || 0;
  const search = '%'+req.query.search+'%';

  let q = 'SELECT * FROM products';
  if (req.query.search) {
    q+= " WHERE name LIKE " + conn.escape(search) + "";
  }
  q+= ' ORDER BY ' + sortBy + ' ' + sort + ' LIMIT ?, ?  ';

  conn.query(q, [page, limit], (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: true,
        message: 'Products Not Found'
      })
    } else {
      if (result.length > 0) {
        res.status(200).json({
          status: 200,
          error: false,
          page: req.query.page, 
          data: result
        });
      } else {
        res.status(400).json({
          status: 400,
          error: true,
          message: 'Products Not Found'
        })
      }
    }
  })
}

exports.getProduct = (req, res) => {
  const q = 'SELECT * FROM products WHERE id = ?';
  conn.query(q, req.params.id, (err, result) => {
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
          message: `Product with id ${req.params.id} not found`
        })
      }
      
    }
  })
}

exports.createProduct = (req, res) => {
  const {name, description, image, id_category, quantity} = req.body;
  const time = new Date();

  if (!name || !description|| !image|| !id_category|| !quantity) {
    res.status(300).json({
      status: 300,
      message: 'Name, description, image, category, and quantity are needed'
    })
  }

  const q = 'INSERT INTO products (name, description, image, id_category, quantity, date_added, date_updated) VALUES (?, ?, ?, ? ,?, ?, ?)';
  conn.query(q, [name, description, image, id_category, quantity, time, time], (err, result) => {
    if (err) {
      res.status(500).json({
        status: 500,
        error: true,
        message: 'Failed to create product'
      })
    } else {
      res.status(200).json({
        status: 200,
        error: false,
        message: 'Success creating product',
        id: result.insertId,
        data: [
          req.body,
        ],
        date_created: time,
        date_updated: time,
      });
    }
  })
}

exports.updateProduct = (req, res) => {
  const {name, description, image, id_category, quantity} = req.body;
  const time = new Date();

  if (!name || !description|| !image|| !id_category|| !quantity) {
    res.status(300).json({
      status: 300,
      message: 'Name, description, image, category, and quantity are needed'
    })
  }

  const q = "UPDATE products SET name = ?, description = ?, image = ?, id_category = ?, quantity = ?, date_added = date_added, date_updated = ?  WHERE id = ?";
  conn.query(q, [name, description, image, id_category, quantity, time, req.params.id], (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: true,
        message: `Failed to update product with id ${req.params.id}`
      })
    } else {
      res.status(200).json({
        status: 200,
        error: false,
        message: `Success updating product with id ${req.params.id}`,
        data: [
          req.body,
        ]
      });
    }
  })
}

exports.deleteProduct = (req, res) => {
  conn.query('DELETE FROM products WHERE id = ?', req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: true,
        message: `Failed to delete product with id ${req.params.id}`
      })
    } else {
      res.status(200).json({
        status: 200,
        error: false,
        message: `Success deleting product with id ${req.params.id}`,
        data: result
      });
    }
  })
}

exports.addOrReduceQuantity = (req, res) => {
  const act = req.query.act;
  const by = parseInt(req.query.by) || 1;
  const time = new Date();

  if (act == 'add') {
    var q = 'UPDATE products SET quantity = quantity + ?, date_updated = ? WHERE id = ?'
  } else if ( act == 'reduce') {
    var q = 'UPDATE products SET quantity = quantity - ?, date_updated = ? WHERE id = ? AND quantity > 0 AND quantity > ?';
  }
  
  conn.query(q, [by, time, req.params.id, by], (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: true,
        message: `Failed to ${act} product quantity with id ${req.params.id}`
      });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          error: false,
          message: `Success ${act} product quantity with id ${req.params.id}`,
          data: result
        });
      } else {
        res.status(300).json({
          status: 300,
          error: true,
          message: `Failed to ${act} product quantity with id ${req.params.id}, quantity cannot be less than 0`
        });
      }
    }
  })
}
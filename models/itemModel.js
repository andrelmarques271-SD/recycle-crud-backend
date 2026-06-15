const db = require('./db');

const ItemModel = {
  getAll: (callback) => {
    db.all('SELECT * FROM recyclable_items ORDER BY id DESC', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM recyclable_items WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { name, material, quantity, collection_point, collected } = data;
    db.run(
      `INSERT INTO recyclable_items (name, material, quantity, collection_point, collected)
       VALUES (?, ?, ?, ?, ?)`,
      [name, material, quantity || 1, collection_point || '', collected ? 1 : 0],
      function (err) {
        callback(err, { id: this ? this.lastID : null });
      }
    );
  },

  update: (id, data, callback) => {
    const { name, material, quantity, collection_point, collected } = data;
    db.run(
      `UPDATE recyclable_items
       SET name = ?, material = ?, quantity = ?, collection_point = ?, collected = ?
       WHERE id = ?`,
      [name, material, quantity || 1, collection_point || '', collected ? 1 : 0, id],
      function (err) {
        callback(err, { changes: this ? this.changes : 0 });
      }
    );
  },

  delete: (id, callback) => {
    db.run('DELETE FROM recyclable_items WHERE id = ?', [id], function (err) {
      callback(err, { changes: this ? this.changes : 0 });
    });
  },
};

module.exports = ItemModel;

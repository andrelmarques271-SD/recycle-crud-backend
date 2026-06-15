const ItemModel = require('../models/itemModel');

// Materiais válidos para o cadastro
const VALID_MATERIALS = ['plastico', 'papel', 'vidro', 'metal', 'eletronico', 'organico', 'outro'];

const ItemController = {
  // GET /items
  list: (req, res) => {
    ItemModel.getAll((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // GET /items/:id
  getOne: (req, res) => {
    const { id } = req.params;
    ItemModel.getById(id, (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Item não encontrado' });
      res.json(row);
    });
  },

  // POST /items
  create: (req, res) => {
    const { name, material, quantity, collection_point, collected } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'O campo "name" é obrigatório' });
    }
    if (!material || !VALID_MATERIALS.includes(material)) {
      return res.status(400).json({
        error: `O campo "material" é obrigatório e deve ser um de: ${VALID_MATERIALS.join(', ')}`,
      });
    }

    ItemModel.create({ name, material, quantity, collection_point, collected }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      ItemModel.getById(result.id, (err2, row) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.status(201).json(row);
      });
    });
  },

  // PUT /items/:id
  update: (req, res) => {
    const { id } = req.params;
    const { name, material, quantity, collection_point, collected } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'O campo "name" é obrigatório' });
    }
    if (!material || !VALID_MATERIALS.includes(material)) {
      return res.status(400).json({
        error: `O campo "material" é obrigatório e deve ser um de: ${VALID_MATERIALS.join(', ')}`,
      });
    }

    ItemModel.getById(id, (err, existing) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!existing) return res.status(404).json({ error: 'Item não encontrado' });

      ItemModel.update(id, { name, material, quantity, collection_point, collected }, (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        ItemModel.getById(id, (err3, row) => {
          if (err3) return res.status(500).json({ error: err3.message });
          res.json(row);
        });
      });
    });
  },

  // DELETE /items/:id
  remove: (req, res) => {
    const { id } = req.params;

    ItemModel.getById(id, (err, existing) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!existing) return res.status(404).json({ error: 'Item não encontrado' });

      ItemModel.delete(id, (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.status(204).send();
      });
    });
  },
};

module.exports = ItemController;

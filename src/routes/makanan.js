import express from 'express';
import mongoose from 'mongoose';
import makanan from '../model/makanan.js';

const router = express.Router();

const idValid = (id) => mongoose.isValidObjectId(id);


router.post('/', async (req, res) => {
  try {
    const data = await makanan.create(req.body);
    res.status(201).json({ success: true, message: 'Data berhasil ditambahkan', data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const data = await makanan.find();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    if (!idValid(req.params.id))
      return res.status(400).json({ success: false, message: 'ID tidak valid' });

    const data = await makanan.findById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    if (!idValid(req.params.id))
      return res.status(400).json({ success: false, message: 'ID tidak valid' });

    const data = await makanan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data)
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });

    res.status(200).json({ success: true, message: 'Data berhasil diperbarui', data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    if (!idValid(req.params.id))
      return res.status(400).json({ success: false, message: 'ID tidak valid' });

    const data = await makanan.findByIdAndDelete(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });

    res.status(200).json({ success: true, message: 'Data berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
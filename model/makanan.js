import mongoose from 'mongoose';

const makananSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name wajib diisi'],
      trim: true,
    },
    address: {
      type: Number,
      required: [true, 'address wajib diisi'],
      min: [1, 'address tidak valid'],
    },
    cuisine_type: {
      type: String,
      required: [true, 'cuisine_type wajib diisi'],
      trim: true,
    },
      rating: {
      type: Number,
      required: [true, 'rating wajib diisi'],
      min: [1, 'rating tidak valid'],
    },
  },
  { timestamps: true }
);
export default mongoose.model('Makanan', makananSchema, 'makanan');
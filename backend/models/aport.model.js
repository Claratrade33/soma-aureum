import mongoose from 'mongoose';

const aportSchema = new mongoose.Schema({
  username: { type: String, required: true },
  aporte:   { type: Number, required: true },
  virtual:  { type: Number, required: true },
  tier:     { type: String, enum: ['Bronze','Prata','Ouro','Diamante'], required: true },
}, { timestamps: true });

export default mongoose.model('Aport', aportSchema);

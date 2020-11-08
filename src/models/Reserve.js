import { Schema, model } from 'mongoose';

const ReserveSchema = new Schema({
  date: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  house_id: {
    type: Schema.Types.ObjectId,
    ref: 'House',
  },
});

export default model('Reserve', ReserveSchema);

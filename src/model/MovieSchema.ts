import mongoose from 'mongoose';

interface Movie {
  name: String;
  description: String;
  category?: String;
  _id?: String;
}

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
});

export default mongoose.model<Movie>('Movies', Schema);

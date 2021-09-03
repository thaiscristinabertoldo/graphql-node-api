require('dotenv').config();

import mongoose from 'mongoose';

const uri: string = process.env.DB_URI_CONNECTION as string;

mongoose.connect(uri);

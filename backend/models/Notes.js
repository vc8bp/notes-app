const mongoose = require('mongoose');
const { Schema } = mongoose;

  const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',

      },
    title:{
        //type: Array,
        type: String,
        required: true,
    },
    description: {
        //type: Array,
        type: String,
        required: true,
    },
    tags: {
        type: String,
        default: "general"  ,
    },
    date: {
        type: Date,
        default: Date.now,
    },
  });



  module.exports = mongoose.model('notes', NotesSchema)
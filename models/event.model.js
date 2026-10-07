const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide an event name"],
    trim:true
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: [true, "e.g. Hall B"]
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    enum: ['academic', 'social', 'sports', 'career', 'other'],
    default: 'other'
  },
  isFree: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  }
},
{
    timestamps: true
}


);

eventSchema.index({date: 1, location: 1}, {unique: true});

module.exports = mongoose.model('Event', eventSchema);

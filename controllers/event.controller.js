const Event = require('../models/event.model.js');

const createEvent = async (req, res) => {
     try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
      }
      catch (error) {
	      if (error.code ==11000) {
		res.status(409).json({error: 'Duplicate event'});
	      }
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getEvents = async (req, res) => {
     try {
        const events = await Event.find();
        res.json(events);
      }
      catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getEventById = async (req, res) => {
    try {
        const {id} = req.params;
        const event = await Event.findById(id);
        if (!event) {
          return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
      }
      catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}


const updateEvent = async (req, res) => {
    try {
        const {id} = req.params;
        const event = await Event.findByIdAndUpdate(id, req.body)
        if (!event) {
          return res.status(404).json({ error: 'Event not found' });
        }
    
        res.json(event);
      }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
      }
}

const deleteEvent = async (req, res) => {
    try {
          const {id} = req.params;
          const event = await Event.findByIdAndDelete(id);
          if (!event) {
            return res.status(404).json({ error: 'Event not found' });
          }
          res.json({ message: 'Event deleted successfully' });
        }
        catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
}

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}

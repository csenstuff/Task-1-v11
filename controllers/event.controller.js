const Event = require('../models/event.model.js');

const upcomingEvent = async (req, res, next) => {
  try {
    const events = await Event.find({
      date: { $gt: new Date() },
    }).sort({ date: 1 });
    
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


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
     	const filters = {};
     	
    	if(req.query.title){
     	  filters.title = req.query.title;
     	}
     	if(req.query.isFree){
     	  filters.isFree = (req.query.isFree === "true");
     	}
     	if(req.query.description){
     	  filters.description = req.query.description;
     	}
     	if(req.query.date){
     	  filters.date = new Date(req.query.date);
     	}
     	if(req.query.location){
     	  filters.location = req.query.location;
     	}
     	if(req.query.capacity){
     	  filters.capacity = Number(req.query.capacity);
     	}
     	if(req.query.category){
     	  filters.category = req.query.category;
     	}
     	if(req.query.price){
     	  filters.price = Number(req.query.price);
     	}
     	
        const events = await Event.find(filters);
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
    upcomingEvent,
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}

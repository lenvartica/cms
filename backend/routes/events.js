const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventAttendees
} = require('../controllers/events');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getEvents)
  .post(protect, authorize('admin', 'pastor', 'leader'), createEvent);

router
  .route('/:id')
  .get(protect, getEvent)
  .put(protect, authorize('admin', 'pastor', 'leader'), updateEvent)
  .delete(protect, authorize('admin', 'pastor'), deleteEvent);

router
  .route('/:id/register')
  .post(protect, registerForEvent);

router
  .route('/:id/attendees')
  .get(protect, getEventAttendees);

module.exports = router;

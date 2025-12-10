const express = require('express');
const router = express.Router();
const {
  getMinistries,
  getMinistry,
  createMinistry,
  updateMinistry,
  deleteMinistry,
  addMemberToMinistry,
  removeMemberFromMinistry
} = require('../controllers/ministries');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getMinistries)
  .post(protect, authorize('admin', 'pastor', 'leader'), createMinistry);

router
  .route('/:id')
  .get(protect, getMinistry)
  .put(protect, authorize('admin', 'pastor', 'leader'), updateMinistry)
  .delete(protect, authorize('admin', 'pastor'), deleteMinistry);

router
  .route('/:id/members')
  .post(protect, authorize('admin', 'pastor', 'leader'), addMemberToMinistry)
  .delete(protect, authorize('admin', 'pastor', 'leader'), removeMemberFromMinistry);

module.exports = router;

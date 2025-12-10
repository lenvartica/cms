const express = require('express');
const router = express.Router();
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  getMemberAttendance,
  updateMemberAttendance
} = require('../controllers/members');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getMembers)
  .post(protect, authorize('admin', 'pastor'), createMember);

router
  .route('/:id')
  .get(protect, getMember)
  .put(protect, authorize('admin', 'pastor'), updateMember)
  .delete(protect, authorize('admin', 'pastor'), deleteMember);

router
  .route('/:id/attendance')
  .get(protect, getMemberAttendance)
  .put(protect, authorize('admin', 'pastor', 'leader'), updateMemberAttendance);

module.exports = router;

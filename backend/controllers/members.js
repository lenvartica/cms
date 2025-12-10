const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all members
// @route   GET /api/members
// @access  Private
exports.getMembers = asyncHandler(async (req, res, next) => {
  const members = await User.find({ role: { $in: ['member', 'volunteer', 'leader', 'pastor'] } })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: members.length,
    data: members
  });
});

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
exports.getMember = asyncHandler(async (req, res, next) => {
  const member = await User.findById(req.params.id);

  if (!member) {
    return next(new ErrorResponse(`Member not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: member
  });
});

// @desc    Create member
// @route   POST /api/members
// @access  Private
exports.createMember = asyncHandler(async (req, res, next) => {
  const member = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: member
  });
});

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Private
exports.updateMember = asyncHandler(async (req, res, next) => {
  const member = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!member) {
    return next(new ErrorResponse(`Member not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: member
  });
});

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Private
exports.deleteMember = asyncHandler(async (req, res, next) => {
  const member = await User.findByIdAndDelete(req.params.id);

  if (!member) {
    return next(new ErrorResponse(`Member not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get member attendance
// @route   GET /api/members/:id/attendance
// @access  Private
exports.getMemberAttendance = asyncHandler(async (req, res, next) => {
  // This would be implemented with an Attendance model
  res.status(200).json({
    success: true,
    data: []
  });
});

// @desc    Update member attendance
// @route   PUT /api/members/:id/attendance
// @access  Private
exports.updateMemberAttendance = asyncHandler(async (req, res, next) => {
  // This would be implemented with an Attendance model
  res.status(200).json({
    success: true,
    data: {}
  });
});

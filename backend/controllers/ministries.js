const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all ministries
// @route   GET /api/ministries
// @access  Private
exports.getMinistries = asyncHandler(async (req, res, next) => {
  // Mock data for now - would use Ministry model
  const ministries = [
    {
      _id: '1',
      name: 'Children Ministry',
      leader: 'Sarah Williams',
      meetingDay: 'Sunday',
      description: 'Ministry for children ages 4-12',
      members: [
        { member: '1', role: 'leader' },
        { member: '2', role: 'volunteer' }
      ]
    },
    {
      _id: '2',
      name: 'Youth Ministry',
      leader: 'David Brown',
      meetingDay: 'Friday',
      description: 'Ministry for teenagers and young adults',
      members: [
        { member: '3', role: 'leader' }
      ]
    },
    {
      _id: '3',
      name: 'Worship Team',
      leader: 'Mike Johnson',
      meetingDay: 'Wednesday',
      description: 'Music and worship ministry',
      members: [
        { member: '4', role: 'leader' },
        { member: '5', role: 'member' }
      ]
    }
  ];

  res.status(200).json({
    success: true,
    count: ministries.length,
    data: ministries
  });
});

// @desc    Get single ministry
// @route   GET /api/ministries/:id
// @access  Private
exports.getMinistry = asyncHandler(async (req, res, next) => {
  const ministry = {
    _id: req.params.id,
    name: 'Children Ministry',
    leader: 'Sarah Williams',
    meetingDay: 'Sunday',
    description: 'Ministry for children ages 4-12',
    members: [
      { member: '1', role: 'leader' },
      { member: '2', role: 'volunteer' }
    ]
  };

  res.status(200).json({
    success: true,
    data: ministry
  });
});

// @desc    Create ministry
// @route   POST /api/ministries
// @access  Private
exports.createMinistry = asyncHandler(async (req, res, next) => {
  const ministry = {
    _id: Date.now().toString(),
    ...req.body
  };

  res.status(201).json({
    success: true,
    data: ministry
  });
});

// @desc    Update ministry
// @route   PUT /api/ministries/:id
// @access  Private
exports.updateMinistry = asyncHandler(async (req, res, next) => {
  const ministry = {
    _id: req.params.id,
    ...req.body
  };

  res.status(200).json({
    success: true,
    data: ministry
  });
});

// @desc    Delete ministry
// @route   DELETE /api/ministries/:id
// @access  Private
exports.deleteMinistry = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add member to ministry
// @route   POST /api/ministries/:id/members
// @access  Private
exports.addMemberToMinistry = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      ministryId: req.params.id,
      memberId: req.body.memberId,
      role: req.body.role || 'member'
    }
  });
});

// @desc    Remove member from ministry
// @route   DELETE /api/ministries/:id/members
// @access  Private
exports.removeMemberFromMinistry = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
});

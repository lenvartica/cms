const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all donations
// @route   GET /api/giving
// @access  Private
exports.getDonations = asyncHandler(async (req, res, next) => {
  // Mock data for now - would use Donation model
  const donations = [
    {
      _id: '1',
      donorName: 'John Doe',
      amount: 100,
      type: 'tithe',
      paymentMethod: 'online',
      date: new Date(),
      notes: 'Monthly tithe'
    },
    {
      _id: '2',
      donorName: 'Jane Smith',
      amount: 50,
      type: 'offering',
      paymentMethod: 'cash',
      date: new Date(),
      notes: 'Sunday offering'
    }
  ];

  res.status(200).json({
    success: true,
    count: donations.length,
    data: donations
  });
});

// @desc    Get single donation
// @route   GET /api/giving/:id
// @access  Private
exports.getDonation = asyncHandler(async (req, res, next) => {
  const donation = {
    _id: req.params.id,
    donorName: 'John Doe',
    amount: 100,
    type: 'tithe',
    paymentMethod: 'online',
    date: new Date(),
    notes: 'Monthly tithe'
  };

  res.status(200).json({
    success: true,
    data: donation
  });
});

// @desc    Create donation
// @route   POST /api/giving
// @access  Private
exports.createDonation = asyncHandler(async (req, res, next) => {
  const donation = {
    _id: Date.now().toString(),
    ...req.body,
    date: new Date(req.body.date)
  };

  res.status(201).json({
    success: true,
    data: donation
  });
});

// @desc    Update donation
// @route   PUT /api/giving/:id
// @access  Private
exports.updateDonation = asyncHandler(async (req, res, next) => {
  const donation = {
    _id: req.params.id,
    ...req.body
  };

  res.status(200).json({
    success: true,
    data: donation
  });
});

// @desc    Delete donation
// @route   DELETE /api/giving/:id
// @access  Private
exports.deleteDonation = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get donation reports
// @route   GET /api/giving/reports
// @access  Private
exports.getDonationReports = asyncHandler(async (req, res, next) => {
  const reports = {
    totalGiving: 12500,
    monthlyGiving: 2500,
    yearlyGiving: 30000,
    averageGiving: 125,
    donorCount: 100
  };

  res.status(200).json({
    success: true,
    data: reports
  });
});

// @desc    Process payment
// @route   POST /api/giving/payment
// @access  Private
exports.processPayment = asyncHandler(async (req, res, next) => {
  // This would integrate with Stripe or other payment processor
  res.status(200).json({
    success: true,
    data: {
      paymentId: 'pay_' + Date.now(),
      status: 'completed',
      amount: req.body.amount
    }
  });
});

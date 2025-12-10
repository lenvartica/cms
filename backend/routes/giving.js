const express = require('express');
const router = express.Router();
const {
  getDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
  getDonationReports,
  processPayment
} = require('../controllers/giving');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getDonations)
  .post(protect, createDonation);

router
  .route('/payment')
  .post(protect, processPayment);

router
  .route('/reports')
  .get(protect, authorize('admin', 'pastor'), getDonationReports);

router
  .route('/:id')
  .get(protect, getDonation)
  .put(protect, authorize('admin', 'pastor'), updateDonation)
  .delete(protect, authorize('admin', 'pastor'), deleteDonation);

module.exports = router;

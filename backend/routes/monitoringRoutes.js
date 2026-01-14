const express = require('express');
const {
  getMonitoringReports,
  getMonitoringReport,
  createMonitoringReport,
  updateMonitoringReport,
  deleteMonitoringReport,
  approveMonitoringReport
} = require('../controllers/monitoringController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getMonitoringReports)
  .post(protect, createMonitoringReport);

router.route('/:id')
  .get(protect, getMonitoringReport)
  .put(protect, updateMonitoringReport)
  .delete(protect, authorize('admin', 'senior_management'), deleteMonitoringReport);

router.route('/:id/approve')
  .put(protect, authorize('admin', 'senior_management', 'monitoring_officer'), approveMonitoringReport);

module.exports = router;
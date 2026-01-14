const express = require('express');
const {
  getMilestones,
  getMilestone,
  createMilestone,
  updateMilestone,
  deleteMilestone
} = require('../controllers/milestoneController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(protect, getMilestones)
  .post(protect, createMilestone);

router.route('/:id')
  .get(protect, getMilestone)
  .put(protect, updateMilestone)
  .delete(protect, authorize('admin', 'senior_management'), deleteMilestone);

module.exports = router;
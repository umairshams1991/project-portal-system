const express = require('express');
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const milestoneRouter = require('./milestoneRoutes');

const router = express.Router();

// Re-route into other resource routers
router.use('/:projectId/milestones', milestoneRouter);

router.route('/')
  .get(protect, getProjects)
  .post(protect, createProject);

router.route('/:id')
  .get(protect, getProject)
  .put(protect, updateProject)
  .delete(protect, authorize('admin', 'senior_management'), deleteProject);

module.exports = router;
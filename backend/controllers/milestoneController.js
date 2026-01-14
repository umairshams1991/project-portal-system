const Milestone = require('../models/Milestone');
const Project = require('../models/Project');

// @desc    Get all milestones for a project
// @route   GET /api/v1/milestones
// @access  Private
exports.getMilestones = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc.)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Milestone.find(JSON.parse(queryStr))
      .populate('project', 'projectCode projectName')
      .populate('assignedTo', 'firstName lastName email');

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Milestone.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const milestones = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.previous = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: milestones.length,
      pagination,
      data: {
        milestones
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single milestone
// @route   GET /api/v1/milestones/:id
// @access  Private
exports.getMilestone = async (req, res, next) => {
  try {
    const milestone = await Milestone.findById(req.params.id)
      .populate('project', 'projectCode projectName')
      .populate('assignedTo', 'firstName lastName email');

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: `No milestone found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: {
        milestone
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new milestone
// @route   POST /api/v1/milestones
// @access  Private
exports.createMilestone = async (req, res, next) => {
  try {
    // Check if project exists and user has permission
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: `No project found with id ${req.body.project}`
      });
    }

    // Check if user is authorized to create milestone for this project
    if (req.user.role !== 'admin' &&
        req.user.role !== 'senior_management' &&
        project.projectDirector.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to create milestones for this project'
      });
    }

    const milestone = await Milestone.create(req.body);

    res.status(201).json({
      success: true,
      data: {
        milestone
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update milestone
// @route   PUT /api/v1/milestones/:id
// @access  Private
exports.updateMilestone = async (req, res, next) => {
  try {
    let milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: `No milestone found with id ${req.params.id}`
      });
    }

    // Check if user is authorized to update this milestone
    const project = await Project.findById(milestone.project);
    if (req.user.role !== 'admin' &&
        req.user.role !== 'senior_management' &&
        project.projectDirector.toString() !== req.user.id.toString() &&
        (milestone.assignedTo && milestone.assignedTo.toString() !== req.user.id.toString())) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this milestone'
      });
    }

    milestone = await Milestone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: {
        milestone
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete milestone
// @route   DELETE /api/v1/milestones/:id
// @access  Private
exports.deleteMilestone = async (req, res, next) => {
  try {
    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: `No milestone found with id ${req.params.id}`
      });
    }

    // Check if user is authorized to delete this milestone
    const project = await Project.findById(milestone.project);
    if (req.user.role !== 'admin' && req.user.role !== 'senior_management') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this milestone'
      });
    }

    await milestone.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
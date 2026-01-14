const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
exports.getProjects = async (req, res, next) => {
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
    query = Project.find(JSON.parse(queryStr)).populate('projectDirector', 'firstName lastName email role');

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
    const total = await Project.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const projects = await query;

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
      status: 'success',
      count: projects.length,
      pagination,
      data: {
        projects
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// @desc    Get single project
// @route   GET /api/v1/projects/:id
// @access  Private
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('projectDirector', 'firstName lastName email role');

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: `No project found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/v1/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // Make sure user is project director or admin
    if (req.user.role !== 'admin' && req.user.role !== 'project_director' && req.user.role !== 'senior_management') {
      return res.status(401).json({
        status: 'fail',
        message: 'Not authorized to create projects'
      });
    }

    const project = await Project.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// @desc    Update project
// @route   PUT /api/v1/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: `No project found with id ${req.params.id}`
      });
    }

    // Make sure user is project director, admin, or the creator
    if (req.user.role !== 'admin' &&
        req.user.role !== 'senior_management' &&
        project.projectDirector.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        status: 'fail',
        message: 'Not authorized to update this project'
      });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: `No project found with id ${req.params.id}`
      });
    }

    // Make sure user is admin or senior management
    if (req.user.role !== 'admin' && req.user.role !== 'senior_management') {
      return res.status(401).json({
        status: 'fail',
        message: 'Not authorized to delete this project'
      });
    }

    await project.remove();

    res.status(200).json({
      status: 'success',
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
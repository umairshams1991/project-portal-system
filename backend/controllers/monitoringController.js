const Monitoring = require('../models/Monitoring');
const Project = require('../models/Project');

// @desc    Get all monitoring reports
// @route   GET /api/v1/monitoring
// @access  Private
exports.getMonitoringReports = async (req, res, next) => {
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
    query = Monitoring.find(JSON.parse(queryStr))
      .populate('project', 'projectCode projectName sector location')
      .populate('submittedBy', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName email');

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
    const total = await Monitoring.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const monitoringReports = await query;

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
      count: monitoringReports.length,
      pagination,
      data: {
        monitoringReports
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single monitoring report
// @route   GET /api/v1/monitoring/:id
// @access  Private
exports.getMonitoringReport = async (req, res, next) => {
  try {
    const monitoring = await Monitoring.findById(req.params.id)
      .populate('project', 'projectCode projectName sector location')
      .populate('submittedBy', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName email');

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: `No monitoring report found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: {
        monitoring
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new monitoring report
// @route   POST /api/v1/monitoring
// @access  Private
exports.createMonitoringReport = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.submittedBy = req.user.id;

    // Check if project exists and user has permission
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: `No project found with id ${req.body.project}`
      });
    }

    // Check if user is authorized to submit report for this project
    if (req.user.role !== 'admin' &&
        req.user.role !== 'senior_management' &&
        project.projectDirector.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to submit reports for this project'
      });
    }

    // Check if a report for this period already exists
    const existingReport = await Monitoring.findOne({
      project: req.body.project,
      reportingPeriod: req.body.reportingPeriod
    });

    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: `A report for this period (${req.body.reportingPeriod}) already exists for this project`
      });
    }

    const monitoring = await Monitoring.create(req.body);

    res.status(201).json({
      success: true,
      data: {
        monitoring
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update monitoring report
// @route   PUT /api/v1/monitoring/:id
// @access  Private
exports.updateMonitoringReport = async (req, res, next) => {
  try {
    let monitoring = await Monitoring.findById(req.params.id);

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: `No monitoring report found with id ${req.params.id}`
      });
    }

    // Check if user is authorized to update this report
    if (req.user.role !== 'admin' &&
        req.user.role !== 'senior_management' &&
        monitoring.submittedBy.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this report'
      });
    }

    // Check if report is already approved (cannot be modified)
    if (monitoring.status === 'Approved') {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify an approved report'
      });
    }

    monitoring = await Monitoring.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: {
        monitoring
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete monitoring report
// @route   DELETE /api/v1/monitoring/:id
// @access  Private
exports.deleteMonitoringReport = async (req, res, next) => {
  try {
    const monitoring = await Monitoring.findById(req.params.id);

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: `No monitoring report found with id ${req.params.id}`
      });
    }

    // Check if user is authorized to delete this report
    if (req.user.role !== 'admin' && req.user.role !== 'senior_management') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this report'
      });
    }

    // Check if report is already approved (cannot be deleted)
    if (monitoring.status === 'Approved') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete an approved report'
      });
    }

    await monitoring.remove();

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

// @desc    Approve monitoring report
// @route   PUT /api/v1/monitoring/:id/approve
// @access  Private
exports.approveMonitoringReport = async (req, res, next) => {
  try {
    let monitoring = await Monitoring.findById(req.params.id);

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: `No monitoring report found with id ${req.params.id}`
      });
    }

    // Check if user is authorized to approve this report
    if (req.user.role !== 'admin' && req.user.role !== 'senior_management' && req.user.role !== 'monitoring_officer') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to approve this report'
      });
    }

    monitoring.status = 'Approved';
    monitoring.approvedBy = req.user.id;
    monitoring.approvedAt = Date.now();

    monitoring = await Monitoring.findByIdAndUpdate(req.params.id, monitoring, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: {
        monitoring
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
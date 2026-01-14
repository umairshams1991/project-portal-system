const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectCode: {
    type: String,
    required: [true, 'Please provide a project code'],
    unique: true,
    maxlength: [50, 'Project code cannot exceed 50 characters']
  },
  projectName: {
    type: String,
    required: [true, 'Please provide a project name'],
    maxlength: [500, 'Project name cannot exceed 500 characters']
  },
  sector: {
    type: String,
    required: [true, 'Please provide a sector'],
    maxlength: [100, 'Sector cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    maxlength: [500, 'Location cannot exceed 500 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date']
  },
  budget: {
    type: Number,
    required: [true, 'Please provide a budget']
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'On Hold', 'Cancelled', 'Delayed'],
    default: 'Active'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  projectDirector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please assign a project director']
  },
  department: {
    type: String,
    required: [true, 'Please provide a department'],
    maxlength: [100, 'Department name cannot exceed 100 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
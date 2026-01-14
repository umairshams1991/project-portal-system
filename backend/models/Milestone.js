const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Please provide a project']
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  plannedDate: {
    type: Date,
    required: [true, 'Please provide a planned date']
  },
  actualCompletionDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed', 'Delayed', 'Cancelled'],
    default: 'Not Started'
  },
  progress: {
    type: Number, // Percentage
    default: 0,
    min: [0, 'Progress cannot be negative'],
    max: [100, 'Progress cannot exceed 100%']
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  }
}, {
  timestamps: true
});

// Index for efficient querying
milestoneSchema.index({ project: 1, status: 1 });

module.exports = mongoose.model('Milestone', milestoneSchema);
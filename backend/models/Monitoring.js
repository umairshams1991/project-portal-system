const mongoose = require('mongoose');

const monitoringSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Please provide a project']
  },
  reportingPeriod: {
    type: String, // Format: YYYY-MM
    required: [true, 'Please provide a reporting period'],
    match: [/^\d{4}-\d{2}$/, 'Please provide a valid reporting period (YYYY-MM)']
  },
  statusUpdate: {
    type: String,
    maxlength: [1000, 'Status update cannot exceed 1000 characters']
  },
  keyMilestones: {
    type: String,
    maxlength: [1000, 'Key milestones cannot exceed 1000 characters']
  },
  challenges: {
    type: String,
    maxlength: [1000, 'Challenges cannot exceed 1000 characters']
  },
  achievements: {
    type: String,
    maxlength: [1000, 'Achievements cannot exceed 1000 characters']
  },
  budgetUtilization: {
    type: Number, // Percentage
    min: [0, 'Budget utilization cannot be negative'],
    max: [100, 'Budget utilization cannot exceed 100%']
  },
  nextSteps: {
    type: String,
    maxlength: [1000, 'Next steps cannot exceed 1000 characters']
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the submitter']
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
    default: 'Draft'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  documents: [{
    fileName: String,
    filePath: String,
    fileSize: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for efficient querying
monitoringSchema.index({ project: 1, reportingPeriod: 1 }, { unique: true });

module.exports = mongoose.model('Monitoring', monitoringSchema);
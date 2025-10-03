const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User ',
    required: true,
    unique: true,
  },
  highSchoolMarks: {
    type: {
      math: { type: Number, default: 0 },
      science: { type: Number, default: 0 },
    },
    default: {},
  },
  tenPlusTwoMarks: {
    physics: { type: Number, required: true },
    chemistry: { type: Number, required: true },
    math: { type: Number, required: true },
    totalMarks: {
      type: Number,
      default: function () {
        return this.physics + this.chemistry + this.math;
      },
    },
  },
  branchChoices: [{
    type: String,
    maxlength: 50,
  }],
  allocatedBranch: {
    type: String,
    default: null,
  },
  paymentReceiptUrl: {
    type: String,
    default: null,
  },
  isPaymentVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Ensure branchChoices max length of 2
studentProfileSchema.pre('save', function (next) {
  if (this.branchChoices && this.branchChoices.length > 2) {
    this.branchChoices = this.branchChoices.slice(0, 2);
  }
  next();
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
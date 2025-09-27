const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true,
    maxlength: [100, 'Campaign name cannot exceed 100 characters']
  },
  landingUrl: {
    type: String,
    required: [true, 'Landing URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Please enter a valid URL'
    }
  },
  campaignType: {
    type: String,
    required: [true, 'Campaign type is required'],
    enum: {
      values: ['cpc', 'cpm', 'cpa'],
      message: 'Campaign type must be either cpc, cpm, or cpa'
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  trafficPackage: {
    amount: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    customAmount: {
      type: String,
      validate: {
        validator: function(v) {
          if (this.trafficPackage.amount === 'custom' && !v) {
            return false;
          }
          return true;
        },
        message: 'Custom amount is required for custom packages'
      }
    }
  },
  targeting: {
    targetCountries: {
      type: String,
      default: ''
    },
    deviceType: {
      type: String,
      enum: ['all', 'mobile', 'desktop', 'tablet'],
      default: 'all'
    },
    campaignDuration: {
      type: String,
      enum: ['7', '14', '30', '60', 'custom'],
      default: '30'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'active', 'paused', 'completed'],
      message: 'Status must be pending, active, paused, or completed'
    },
    default: 'pending'
  },
  stats: {
    impressions: {
      type: Number,
      default: 0,
      min: [0, 'Impressions cannot be negative']
    },
    clicks: {
      type: Number,
      default: 0,
      min: [0, 'Clicks cannot be negative']
    },
    spent: {
      type: Number,
      default: 0,
      min: [0, 'Spent amount cannot be negative']
    },
    ctr: {
      type: Number,
      default: 0,
      min: [0, 'CTR cannot be negative']
    }
  },
  userId: {
    type: String,
    required: true,
    default: 'waleed_asif'
  },
  budget: {
    total: {
      type: Number,
      required: true,
      min: [1, 'Budget must be at least $1']
    },
    remaining: {
      type: Number,
      required: true
    }
  },
  schedule: {
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      validate: {
        validator: function(v) {
          return v > this.schedule.startDate;
        },
        message: 'End date must be after start date'
      }
    }
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate budget
campaignSchema.pre('save', function(next) {
  if (this.isNew) {
    const price = parseFloat(this.trafficPackage.price);
    this.budget.total = price;
    this.budget.remaining = price;
    
    // Set end date based on duration
    if (this.targeting.campaignDuration !== 'custom') {
      const duration = parseInt(this.targeting.campaignDuration);
      this.schedule.endDate = new Date(Date.now() + (duration * 24 * 60 * 60 * 1000));
    }
  }
  next();
});

// Instance method to update stats
campaignSchema.methods.updateStats = function(impressions, clicks, spent) {
  this.stats.impressions += impressions;
  this.stats.clicks += clicks;
  this.stats.spent += spent;
  this.budget.remaining = Math.max(0, this.budget.total - this.stats.spent);
  
  // Calculate CTR
  if (this.stats.impressions > 0) {
    this.stats.ctr = ((this.stats.clicks / this.stats.impressions) * 100).toFixed(2);
  }
  
  // Auto-pause if budget exhausted
  if (this.budget.remaining <= 0 && this.status === 'active') {
    this.status = 'completed';
  }
  
  return this.save();
};

// Static method to get user statistics
campaignSchema.statics.getUserStats = async function(userId) {
  const campaigns = await this.find({ userId });
  
  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    pendingCampaigns: campaigns.filter(c => c.status === 'pending').length,
    completedCampaigns: campaigns.filter(c => c.status === 'completed').length,
    totalImpressions: campaigns.reduce((sum, c) => sum + c.stats.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.stats.clicks, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.stats.spent, 0),
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget.total, 0)
  };
  
  // Calculate average CTR
  stats.avgCTR = stats.totalImpressions > 0 ? 
    ((stats.totalClicks / stats.totalImpressions) * 100).toFixed(2) : 0;
  
  return stats;
};

// Virtual for campaign performance
campaignSchema.virtual('performance').get(function() {
  const budget = this.budget.total;
  const spent = this.stats.spent;
  const impressions = this.stats.impressions;
  const clicks = this.stats.clicks;
  
  return {
    budgetUsed: budget > 0 ? ((spent / budget) * 100).toFixed(2) : 0,
    cpm: impressions > 0 ? ((spent / impressions) * 1000).toFixed(2) : 0,
    cpc: clicks > 0 ? (spent / clicks).toFixed(2) : 0,
    remainingDays: this.schedule.endDate ? 
      Math.max(0, Math.ceil((this.schedule.endDate - new Date()) / (1000 * 60 * 60 * 24))) : 0
  };
});

// Ensure virtual fields are serialized
campaignSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Campaign', campaignSchema);
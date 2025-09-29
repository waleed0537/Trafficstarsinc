const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'trafficstars_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from parent directory (where HTML files are located)
app.use(express.static(path.join(__dirname, '..')));

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://adshark00:0KKX2YSBGY9Zrz21@cluster0.g7lpz.mongodb.net/trafficstarsltd?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userType: {
    type: String,
    required: true,
    enum: ['advertiser', 'publisher']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  balance: {
    type: Number,
    default: 0
  },
  profile: {
    company: String,
    phone: String,
    country: String,
    avatar: String
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id, 
      email: this.email, 
      userType: this.userType 
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const User = mongoose.model('User', userSchema);

// Campaign Schema
const campaignSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: true,
    trim: true
  },
  landingUrl: {
    type: String,
    required: true,
    trim: true
  },
  campaignType: {
    type: String,
    required: true,
    enum: ['cpc', 'cpm', 'cpa']
  },
  description: {
    type: String,
    trim: true
  },
  trafficPackage: {
    amount: String,
    price: String,
    customAmount: String
  },
  targeting: {
    targetCountries: String,
    deviceType: String,
    campaignDuration: String
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'paused', 'completed'],
    default: 'pending'
  },
  stats: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    spent: { type: Number, default: 0 },
    ctr: { type: Number, default: 0 }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, userType, terms } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword || !userType) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    if (!terms) {
      return res.status(400).json({
        success: false,
        message: 'You must accept the terms and conditions'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      userType
    });

    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    console.log(`✅ New ${userType} registered: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        balance: user.balance
      },
      token
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: error.message
    });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, userType, remember } = req.body;

    // Validation
    if (!email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and user type are required'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check user type
    if (user.userType !== userType) {
      return res.status(401).json({
        success: false,
        message: `This account is registered as ${user.userType}, not ${userType}`
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated. Please contact support.'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    console.log(`✅ User logged in: ${email} as ${userType}`);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        balance: user.balance,
        lastLogin: user.lastLogin
      },
      token
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
      error: error.message
    });
  }
});

// Get current user profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        userType: req.user.userType,
        balance: req.user.balance,
        profile: req.user.profile,
        lastLogin: req.user.lastLogin
      }
    });
  } catch (error) {
    console.error('❌ Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

// Update user profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, company, phone, country } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        'profile.company': company,
        'profile.phone': phone,
        'profile.country': country
      },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        balance: user.balance,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Logout
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  console.log(`✅ User logged out: ${req.user.email}`);
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Get user stats
app.get('/api/user/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const campaigns = await Campaign.find({ userId });
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const totalImpressions = campaigns.reduce((sum, c) => sum + (c.stats?.impressions || 0), 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + (c.stats?.clicks || 0), 0);
    const totalSpent = campaigns.reduce((sum, c) => sum + (c.stats?.spent || 0), 0);
    const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      totalCampaigns,
      activeCampaigns,
      totalImpressions,
      totalClicks,
      totalSpent: totalSpent.toFixed(2),
      avgCTR: `${avgCTR}%`,
      balance: req.user.balance
    });
  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
});

// Create campaign
app.post('/api/campaigns', authenticateToken, async (req, res) => {
  try {
    console.log('📄 Creating campaign:', req.body.campaignName);
    
    const campaignData = req.body;
    
    // Validate required fields
    if (!campaignData.campaignName || !campaignData.landingUrl || !campaignData.campaignType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if user is advertiser
    if (req.user.userType !== 'advertiser') {
      return res.status(403).json({
        success: false,
        message: 'Only advertisers can create campaigns'
      });
    }

    const campaign = new Campaign({
      campaignName: campaignData.campaignName,
      landingUrl: campaignData.landingUrl,
      campaignType: campaignData.campaignType,
      description: campaignData.description || '',
      trafficPackage: {
        amount: campaignData.package?.amount || '10000',
        price: campaignData.package?.price || '150',
        customAmount: campaignData.package?.customAmount
      },
      targeting: {
        targetCountries: campaignData.targetCountries || '',
        deviceType: campaignData.deviceType || 'all',
        campaignDuration: campaignData.duration || '30'
      },
      userId: req.user._id
    });

    const savedCampaign = await campaign.save();
    console.log('✅ Campaign created:', savedCampaign._id);
    
    // Simulate stats generation after 2 seconds
    setTimeout(async () => {
      try {
        const randomImpressions = Math.floor(Math.random() * 1000) + 100;
        const randomClicks = Math.floor(randomImpressions * 0.02) + 1;
        const spent = parseFloat(campaignData.package?.price || '150') * 0.1;
        
        await Campaign.findByIdAndUpdate(savedCampaign._id, {
          'stats.impressions': randomImpressions,
          'stats.clicks': randomClicks,
          'stats.spent': spent,
          'stats.ctr': ((randomClicks / randomImpressions) * 100).toFixed(2),
          status: 'active'
        });
        
        console.log('📊 Campaign stats updated:', savedCampaign._id);
      } catch (updateError) {
        console.log('⚠️ Auto-update failed:', updateError.message);
      }
    }, 2000);

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      campaign: savedCampaign
    });
  } catch (error) {
    console.error('❌ Campaign creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create campaign',
      error: error.message
    });
  }
});

// Get campaigns
app.get('/api/campaigns', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const campaigns = await Campaign.find({ userId }).sort({ createdAt: -1 });
    
    console.log(`📋 Retrieved ${campaigns.length} campaigns for user ${req.user.email}`);
    
    res.json({
      success: true,
      campaigns
    });
  } catch (error) {
    console.error('❌ Campaigns fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaigns'
    });
  }
});

// Update campaign status
app.patch('/api/campaigns/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'active', 'paused', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found or access denied'
      });
    }
    
    console.log(`📄 Campaign ${req.params.id} status changed to ${status}`);
    
    res.json({
      success: true,
      campaign
    });
  } catch (error) {
    console.error('❌ Status update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

// Delete campaign
app.delete('/api/campaigns/:id', authenticateToken, async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found or access denied'
      });
    }
    
    console.log(`🗑️ Campaign ${req.params.id} deleted`);
    
    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete campaign'
    });
  }
});

// Serve main pages - Updated paths
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'authenticate.html'));
});

app.get('/advertiser_admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'advertiser_admin.html'));
});

app.get('/publisher_admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'publisher_admin.html'));
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});
// Payment Routes

// Create Payment Intent (Stripe)
app.post('/api/payments/create-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, currency, description } = req.body;
    
    // Validate amount
    if (!amount || amount < 10000) { // $100 minimum in cents
      return res.status(400).json({
        success: false,
        message: 'Minimum amount is $100'
      });
    }
    
    if (amount > 10000000) { // $100,000 maximum
      return res.status(400).json({
        success: false,
        message: 'Maximum amount is $100,000'
      });
    }
    
    // In production, you would create a Stripe payment intent here
    // For now, we'll simulate it
    const clientSecret = 'pi_' + Math.random().toString(36).substring(2, 15) + '_secret_' + Math.random().toString(36).substring(2, 15);
    
    console.log(`💳 Payment intent created for ${req.user.email}: $${(amount / 100).toFixed(2)}`);
    
    res.json({
      success: true,
      clientSecret: clientSecret,
      amount: amount
    });
    
  } catch (error) {
    console.error('❌ Payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent'
    });
  }
});

// Confirm Payment and Update Balance
app.post('/api/payments/confirm', authenticateToken, async (req, res) => {
  try {
    const { amount, transactionId, paymentMethod } = req.body;
    
    // Validate
    if (!amount || amount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }
    
    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID required'
      });
    }
    
    // Update user balance
    const user = await User.findById(req.user._id);
    user.balance = (user.balance || 0) + amount;
    await user.save();
    
    console.log(`✅ Payment confirmed for ${user.email}: $${amount} via ${paymentMethod}`);
    console.log(`💰 New balance: $${user.balance.toFixed(2)}`);
    
    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      newBalance: user.balance,
      transactionId: transactionId
    });
    
  } catch (error) {
    console.error('❌ Payment confirmation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment'
    });
  }
});

// Get Payment History
app.get('/api/payments/history', authenticateToken, async (req, res) => {
  try {
    // In production, you would fetch from a payments/transactions collection
    // For now, return mock data
    const mockTransactions = [
      {
        id: 'txn_' + Date.now(),
        type: 'deposit',
        amount: 500,
        method: 'stripe',
        status: 'completed',
        date: new Date(),
        description: 'Account Deposit'
      }
    ];
    
    res.json({
      success: true,
      transactions: mockTransactions
    });
    
  } catch (error) {
    console.error('❌ Payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 TrafficStars Backend Server Started');
  console.log('='.repeat(50));
  console.log(`🌐 Server running on port: ${PORT}`);
  console.log(`🏠 Login page: http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/advertiser_admin.html`);
  console.log(`🔗 API health: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50));
  console.log('💡 User authentication is now fully functional');
  console.log(`📁 Serving static files from: ${path.join(__dirname, '..')}`);
});
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
const placementSchema = new mongoose.Schema({
  placementName: {
    type: String,
    required: true,
    trim: true
  },
  websiteUrl: {
    type: String,
    required: true,
    trim: true
  },
  placementType: {
    type: String,
    required: true,
    enum: ['banner', 'native', 'video', 'popup', 'mobile']
  },
  adSize: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  targetAudience: {
    demographics: String,
    interests: String,
    geoTargeting: String
  },
  pricing: {
    model: String,
    rate: Number,
    minimumBid: Number
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'paused', 'rejected'],
    default: 'pending'
  },
  stats: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    rpm: { type: Number, default: 0 }
  },
  adCode: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Placement = mongoose.model('Placement', placementSchema);
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

const websiteSchema = new mongoose.Schema({
  websiteName: {
    type: String,
    required: true,
    trim: true
  },
  websiteUrl: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  trafficStats: {
    monthlyVisitors: String,
    pageViews: String,
    avgSessionDuration: String
  },
  audience: {
    primaryRegion: String,
    demographics: String,
    interests: String
  },
  monetization: {
    currentlyMonetized: Boolean,
    monetizationMethods: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'pending'
  },
  verificationCode: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Website = mongoose.model('Website', websiteSchema);

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
});// =============================================================================
// ADD THIS CODE TO server.js (After Campaign Schema and before routes)
// =============================================================================

// Ad Placement Schema


// Helper function to generate ad code
function generateAdCode(userId, placementType) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const placementId = `${userId.toString().substring(0, 8)}_${timestamp}_${random}`;
  
  return `<!-- TrafficStars ${placementType.toUpperCase()} Ad Code -->
<div id="ts-ad-${placementId}" class="ts-ad-container"></div>
<script async src="https://cdn.trafficstars.com/ads.js"></script>
<script>
  window.tsAds = window.tsAds || [];
  tsAds.push({
    id: '${placementId}',
    type: '${placementType}',
    container: 'ts-ad-${placementId}'
  });
</script>`;
}

// =============================================================================
// ADD THESE ROUTES TO server.js (After existing routes, before app.listen)
// =============================================================================

// Get all placements for publisher
app.get('/api/placements', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can access placements'
      });
    }
    
    const placements = await Placement.find({ userId }).sort({ createdAt: -1 });
    
    console.log(`📋 Retrieved ${placements.length} placements for publisher ${req.user.email}`);
    
    res.json({
      success: true,
      placements
    });
  } catch (error) {
    console.error('❌ Placements fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch placements'
    });
  }
});

// Create new placement
app.post('/api/placements', authenticateToken, async (req, res) => {
  try {
    console.log('📄 Creating placement:', req.body.placementName);
    
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can create placements'
      });
    }
    
    const placementData = req.body;
    
    if (!placementData.placementName || !placementData.websiteUrl || !placementData.placementType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    const adCode = generateAdCode(req.user._id, placementData.placementType);
    
    const placement = new Placement({
      placementName: placementData.placementName,
      websiteUrl: placementData.websiteUrl,
      placementType: placementData.placementType,
      adSize: placementData.adSize,
      description: placementData.description || '',
      category: placementData.category,
      targetAudience: {
        demographics: placementData.demographics || '',
        interests: placementData.interests || '',
        geoTargeting: placementData.geoTargeting || 'worldwide'
      },
      pricing: {
        model: placementData.pricingModel || 'cpm',
        rate: parseFloat(placementData.rate || '5.00'),
        minimumBid: parseFloat(placementData.minimumBid || '3.00')
      },
      adCode: adCode,
      userId: req.user._id
    });
    
    const savedPlacement = await placement.save();
    console.log('✅ Placement created:', savedPlacement._id);
    
    // Simulate stats after 2 seconds
    setTimeout(async () => {
      try {
        const randomImpressions = Math.floor(Math.random() * 5000) + 500;
        const randomClicks = Math.floor(randomImpressions * 0.015) + 1;
        const revenue = (randomImpressions / 1000) * parseFloat(placementData.rate || '5.00');
        const rpm = randomImpressions > 0 ? (revenue / randomImpressions * 1000).toFixed(2) : 0;
        
        await Placement.findByIdAndUpdate(savedPlacement._id, {
          'stats.impressions': randomImpressions,
          'stats.clicks': randomClicks,
          'stats.revenue': revenue,
          'stats.rpm': rpm,
          status: 'active'
        });
        
        console.log('📊 Placement stats updated:', savedPlacement._id);
      } catch (updateError) {
        console.log('⚠️ Auto-update failed:', updateError.message);
      }
    }, 2000);
    
    res.status(201).json({
      success: true,
      message: 'Placement created successfully and pending approval',
      placement: savedPlacement
    });
  } catch (error) {
    console.error('❌ Placement creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create placement',
      error: error.message
    });
  }
});

// Update placement status
app.patch('/api/placements/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'active', 'paused', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const placement = await Placement.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );
    
    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found or access denied'
      });
    }
    
    console.log(`📄 Placement ${req.params.id} status changed to ${status}`);
    
    res.json({
      success: true,
      placement
    });
  } catch (error) {
    console.error('❌ Status update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

// Delete placement
app.delete('/api/placements/:id', authenticateToken, async (req, res) => {
  try {
    const placement = await Placement.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found or access denied'
      });
    }
    
    console.log(`🗑️ Placement ${req.params.id} deleted`);
    
    res.json({
      success: true,
      message: 'Placement deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete placement'
    });
  }
});

// Get publisher stats
app.get('/api/publisher/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const placements = await Placement.find({ userId });
    const totalPlacements = placements.length;
    const activePlacements = placements.filter(p => p.status === 'active').length;
    const totalImpressions = placements.reduce((sum, p) => sum + (p.stats?.impressions || 0), 0);
    const totalClicks = placements.reduce((sum, p) => sum + (p.stats?.clicks || 0), 0);
    const totalRevenue = placements.reduce((sum, p) => sum + (p.stats?.revenue || 0), 0);
    const avgRPM = totalImpressions > 0 ? ((totalRevenue / totalImpressions) * 1000).toFixed(2) : 0;
    
    res.json({
      success: true,
      totalPlacements,
      activePlacements,
      totalImpressions,
      totalClicks,
      totalRevenue: totalRevenue.toFixed(2),
      avgRPM: `$${avgRPM}`,
      todayEarnings: (totalRevenue * 0.1).toFixed(2)
    });
  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
});

app.get('/api/publisher/profile', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can access this endpoint'
      });
    }

    const user = await User.findById(req.user._id).select('-password');
    
    res.json({
      success: true,
      profile: {
        name: user.name,
        email: user.email,
        company: user.profile?.company || '',
        phone: user.profile?.phone || '',
        country: user.profile?.country || '',
        address: user.profile?.address || '',
        city: user.profile?.city || '',
        zipCode: user.profile?.zipCode || '',
        taxId: user.profile?.taxId || '',
        paymentMethod: user.profile?.paymentMethod || 'bank_transfer',
        paymentDetails: user.profile?.paymentDetails || {}
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

// Update Publisher Profile
app.put('/api/publisher/profile', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can update profile'
      });
    }

    const {
      name,
      company,
      phone,
      country,
      address,
      city,
      zipCode,
      taxId,
      paymentMethod,
      paymentDetails
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        'profile.company': company,
        'profile.phone': phone,
        'profile.country': country,
        'profile.address': address,
        'profile.city': city,
        'profile.zipCode': zipCode,
        'profile.taxId': taxId,
        'profile.paymentMethod': paymentMethod,
        'profile.paymentDetails': paymentDetails
      },
      { new: true }
    ).select('-password');

    console.log(`✅ Profile updated for ${user.email}`);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile: {
        name: user.name,
        email: user.email,
        company: user.profile?.company,
        phone: user.profile?.phone,
        country: user.profile?.country
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

// =============================================================================
// WEBSITE MANAGEMENT ROUTES
// =============================================================================

// Get all websites for publisher
app.get('/api/websites', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can access websites'
      });
    }

    const websites = await Website.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    console.log(`📋 Retrieved ${websites.length} websites for ${req.user.email}`);
    
    res.json({
      success: true,
      websites
    });
  } catch (error) {
    console.error('❌ Websites fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch websites'
    });
  }
});

// Add new website
app.post('/api/websites', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can add websites'
      });
    }

    const websiteData = req.body;
    
    // Validate required fields
    if (!websiteData.websiteName || !websiteData.websiteUrl || !websiteData.category) {
      return res.status(400).json({
        success: false,
        message: 'Website name, URL, and category are required'
      });
    }

    // Check if URL already exists for this user
    const existingWebsite = await Website.findOne({
      websiteUrl: websiteData.websiteUrl,
      userId: req.user._id
    });

    if (existingWebsite) {
      return res.status(400).json({
        success: false,
        message: 'This website URL is already registered'
      });
    }

    // Generate verification code
    const verificationCode = 'ts_verify_' + Math.random().toString(36).substring(2, 15);

    const website = new Website({
      websiteName: websiteData.websiteName,
      websiteUrl: websiteData.websiteUrl,
      category: websiteData.category,
      description: websiteData.description || '',
      trafficStats: {
        monthlyVisitors: websiteData.monthlyVisitors || '',
        pageViews: websiteData.pageViews || '',
        avgSessionDuration: websiteData.avgSessionDuration || ''
      },
      audience: {
        primaryRegion: websiteData.primaryRegion || '',
        demographics: websiteData.demographics || '',
        interests: websiteData.interests || ''
      },
      monetization: {
        currentlyMonetized: websiteData.currentlyMonetized || false,
        monetizationMethods: websiteData.monetizationMethods || ''
      },
      verificationCode: verificationCode,
      userId: req.user._id
    });

    const savedWebsite = await website.save();
    console.log(`✅ Website added: ${savedWebsite.websiteName} by ${req.user.email}`);

    // Auto-approve after 3 seconds for demo purposes
    setTimeout(async () => {
      try {
        await Website.findByIdAndUpdate(savedWebsite._id, {
          status: 'approved',
          isVerified: true
        });
        console.log(`✅ Website auto-approved: ${savedWebsite._id}`);
      } catch (error) {
        console.log('⚠️ Auto-approval failed:', error.message);
      }
    }, 3000);

    res.status(201).json({
      success: true,
      message: 'Website submitted successfully and is under review',
      website: savedWebsite
    });
  } catch (error) {
    console.error('❌ Website creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add website',
      error: error.message
    });
  }
});

// Update website
app.put('/api/websites/:id', authenticateToken, async (req, res) => {
  try {
    const website = await Website.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!website) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }

    console.log(`✅ Website updated: ${website._id}`);

    res.json({
      success: true,
      message: 'Website updated successfully',
      website
    });
  } catch (error) {
    console.error('❌ Website update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update website'
    });
  }
});

// Delete website
app.delete('/api/websites/:id', authenticateToken, async (req, res) => {
  try {
    const website = await Website.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }

    console.log(`🗑️ Website deleted: ${website._id}`);

    res.json({
      success: true,
      message: 'Website deleted successfully'
    });
  } catch (error) {
    console.error('❌ Website delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete website'
    });
  }
});
// =============================================================================
// ADD THIS CODE TO server.js (After existing routes)
// =============================================================================

// Helper function to generate mock analytics data
function generateMockAnalytics(placements, timeRange = 'week') {
  const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : timeRange === 'year' ? 365 : 1;
  
  // Generate daily data
  const dailyData = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const impressions = Math.floor(Math.random() * 10000) + 5000;
    const clicks = Math.floor(impressions * (Math.random() * 0.03 + 0.01));
    const revenue = (impressions / 1000) * (Math.random() * 3 + 2);
    
    dailyData.push({
      date: date.toISOString().split('T')[0],
      impressions,
      clicks,
      revenue: parseFloat(revenue.toFixed(2)),
      rpm: parseFloat(((revenue / impressions) * 1000).toFixed(2)),
      ctr: parseFloat(((clicks / impressions) * 100).toFixed(2))
    });
  }
  
  // Geographic data
  const geoData = [
    { country: 'United States', impressions: 125000, clicks: 2500, revenue: 625.50, flag: '🇺🇸' },
    { country: 'United Kingdom', impressions: 85000, clicks: 1700, revenue: 425.75, flag: '🇬🇧' },
    { country: 'Canada', impressions: 65000, clicks: 1300, revenue: 325.25, flag: '🇨🇦' },
    { country: 'Germany', impressions: 55000, clicks: 1100, revenue: 275.50, flag: '🇩🇪' },
    { country: 'Australia', impressions: 45000, clicks: 900, revenue: 225.00, flag: '🇦🇺' },
    { country: 'France', impressions: 35000, clicks: 700, revenue: 175.50, flag: '🇫🇷' },
    { country: 'India', impressions: 125000, clicks: 2500, revenue: 312.50, flag: '🇮🇳' },
    { country: 'Brazil', impressions: 55000, clicks: 1100, revenue: 137.50, flag: '🇧🇷' }
  ];
  
  // Device data
  const deviceData = [
    { device: 'Desktop', impressions: 285000, clicks: 5700, revenue: 1425.00, percentage: 48 },
    { device: 'Mobile', impressions: 240000, clicks: 4800, revenue: 1200.00, percentage: 40 },
    { device: 'Tablet', impressions: 75000, clicks: 1500, revenue: 375.00, percentage: 12 }
  ];
  
  // Browser data
  const browserData = [
    { browser: 'Chrome', percentage: 45, color: '#4285F4' },
    { browser: 'Safari', percentage: 25, color: '#000000' },
    { browser: 'Firefox', percentage: 15, color: '#FF7139' },
    { browser: 'Edge', percentage: 10, color: '#0078D7' },
    { browser: 'Other', percentage: 5, color: '#94a3b8' }
  ];
  
  // Top placements performance
  const topPlacements = placements.slice(0, 5).map((placement, index) => ({
    id: placement._id,
    name: placement.placementName,
    impressions: Math.floor(Math.random() * 50000) + 20000,
    clicks: Math.floor(Math.random() * 1000) + 400,
    revenue: parseFloat((Math.random() * 300 + 200).toFixed(2)),
    rpm: parseFloat((Math.random() * 5 + 3).toFixed(2)),
    ctr: parseFloat((Math.random() * 2 + 1).toFixed(2))
  }));
  
  // Calculate totals
  const totals = dailyData.reduce((acc, day) => ({
    impressions: acc.impressions + day.impressions,
    clicks: acc.clicks + day.clicks,
    revenue: acc.revenue + day.revenue
  }), { impressions: 0, clicks: 0, revenue: 0 });
  
  totals.ctr = ((totals.clicks / totals.impressions) * 100).toFixed(2);
  totals.rpm = ((totals.revenue / totals.impressions) * 1000).toFixed(2);
  
  // Hour of day performance
  const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour.toString().padStart(2, '0')}:00`,
    impressions: Math.floor(Math.random() * 5000) + 2000,
    clicks: Math.floor(Math.random() * 100) + 40,
    revenue: parseFloat((Math.random() * 30 + 10).toFixed(2))
  }));
  
  return {
    overview: totals,
    dailyData,
    geoData,
    deviceData,
    browserData,
    topPlacements,
    hourlyData,
    timeRange
  };
}

// Get Analytics Overview
app.get('/api/analytics/overview', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can access analytics'
      });
    }
    
    const timeRange = req.query.range || 'week';
    const placements = await Placement.find({ userId: req.user._id });
    
    if (placements.length === 0) {
      return res.json({
        success: true,
        analytics: {
          overview: {
            impressions: 0,
            clicks: 0,
            revenue: 0,
            ctr: 0,
            rpm: 0
          },
          dailyData: [],
          geoData: [],
          deviceData: [],
          browserData: [],
          topPlacements: [],
          hourlyData: [],
          timeRange
        }
      });
    }
    
    const analytics = generateMockAnalytics(placements, timeRange);
    
    console.log(`📊 Analytics data generated for ${req.user.email} (${timeRange})`);
    
    res.json({
      success: true,
      analytics
    });
  } catch (error) {
    console.error('❌ Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

// Get Revenue Breakdown
app.get('/api/analytics/revenue', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can access analytics'
      });
    }
    
    const timeRange = req.query.range || 'month';
    
    // Revenue by placement type
    const revenueByType = [
      { type: 'Banner', revenue: 1250.50, percentage: 35 },
      { type: 'Native', revenue: 890.25, percentage: 25 },
      { type: 'Video', revenue: 712.75, percentage: 20 },
      { type: 'Mobile', revenue: 535.50, percentage: 15 },
      { type: 'Popup', revenue: 178.50, percentage: 5 }
    ];
    
    // Revenue by category
    const revenueByCategory = [
      { category: 'Technology', revenue: 1425.00 },
      { category: 'Entertainment', revenue: 1068.75 },
      { category: 'Business', revenue: 712.50 },
      { category: 'Lifestyle', revenue: 534.38 },
      { category: 'Other', revenue: 356.87 }
    ];
    
    res.json({
      success: true,
      revenue: {
        byType: revenueByType,
        byCategory: revenueByCategory,
        timeRange
      }
    });
  } catch (error) {
    console.error('❌ Revenue analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch revenue analytics'
    });
  }
});

// Get Performance Metrics
app.get('/api/analytics/performance', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can access analytics'
      });
    }
    
    const metrics = {
      fillRate: 94.5,
      viewability: 87.3,
      invalidTraffic: 2.1,
      adBlockRate: 8.7,
      bounceRate: 35.2,
      avgSessionDuration: '4:23',
      pagesPerSession: 3.8,
      newVsReturning: {
        new: 62,
        returning: 38
      }
    };
    
    res.json({
      success: true,
      metrics
    });
  } catch (error) {
    console.error('❌ Performance metrics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch performance metrics'
    });
  }
});

// Export Analytics Report
app.post('/api/analytics/export', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'publisher') {
      return res.status(403).json({
        success: false,
        message: 'Only publishers can export analytics'
      });
    }
    
    const { format, timeRange } = req.body;
    
    console.log(`📥 Analytics export requested: ${format} (${timeRange})`);
    
    res.json({
      success: true,
      message: 'Report generation started',
      downloadUrl: `/downloads/analytics_${Date.now()}.${format}`
    });
  } catch (error) {
    console.error('❌ Analytics export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export analytics'
    });
  }
});
// Verify website
app.post('/api/websites/:id/verify', authenticateToken, async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }

    // In production, you would check if verification code is present on the website
    // For demo, we'll just mark it as verified
    website.isVerified = true;
    website.status = 'approved';
    await website.save();

    console.log(`✅ Website verified: ${website._id}`);

    res.json({
      success: true,
      message: 'Website verified successfully',
      website
    });
  } catch (error) {
    console.error('❌ Website verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify website'
    });
  }
});
// =============================================================================
// ADD THIS CODE TO server.js (After existing routes)
// =============================================================================

// Get User Settings
app.get('/api/settings', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.json({
      success: true,
      settings: {
        account: {
          name: user.name,
          email: user.email,
          company: user.profile?.company || '',
          phone: user.profile?.phone || '',
          country: user.profile?.country || ''
        },
        notifications: {
          emailNotifications: user.profile?.emailNotifications !== false,
          paymentAlerts: user.profile?.paymentAlerts !== false,
          performanceReports: user.profile?.performanceReports !== false,
          weeklyDigest: user.profile?.weeklyDigest !== false
        },
        security: {
          twoFactorEnabled: user.profile?.twoFactorEnabled || false,
          lastPasswordChange: user.profile?.lastPasswordChange || user.createdAt
        },
        payment: {
          paymentMethod: user.profile?.paymentMethod || 'bank_transfer',
          minimumPayout: user.profile?.minimumPayout || 100
        }
      }
    });
  } catch (error) {
    console.error('❌ Settings fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings'
    });
  }
});

// Update Account Information
app.put('/api/settings/account', authenticateToken, async (req, res) => {
  try {
    const { name, company, phone, country } = req.body;
    
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name.trim(),
        'profile.company': company?.trim() || '',
        'profile.phone': phone?.trim() || '',
        'profile.country': country || ''
      },
      { new: true }
    ).select('-password');
    
    console.log(`✅ Account info updated for ${user.email}`);
    
    res.json({
      success: true,
      message: 'Account information updated successfully',
      user: {
        name: user.name,
        email: user.email,
        company: user.profile?.company,
        phone: user.profile?.phone,
        country: user.profile?.country
      }
    });
  } catch (error) {
    console.error('❌ Account update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update account information'
    });
  }
});

// Change Password
app.put('/api/settings/password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All password fields are required'
      });
    }
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }
    
    // Get user with password
    const user = await User.findById(req.user._id);
    
    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    user.profile = user.profile || {};
    user.profile.lastPasswordChange = new Date();
    await user.save();
    
    console.log(`✅ Password changed for ${user.email}`);
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('❌ Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

// Update Notification Preferences
app.put('/api/settings/notifications', authenticateToken, async (req, res) => {
  try {
    const { emailNotifications, paymentAlerts, performanceReports, weeklyDigest } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        'profile.emailNotifications': emailNotifications !== false,
        'profile.paymentAlerts': paymentAlerts !== false,
        'profile.performanceReports': performanceReports !== false,
        'profile.weeklyDigest': weeklyDigest !== false
      },
      { new: true }
    ).select('-password');
    
    console.log(`✅ Notifications updated for ${user.email}`);
    
    res.json({
      success: true,
      message: 'Notification preferences updated successfully'
    });
  } catch (error) {
    console.error('❌ Notifications update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification preferences'
    });
  }
});

// Update Payment Settings
app.put('/api/settings/payment', authenticateToken, async (req, res) => {
  try {
    const { paymentMethod, minimumPayout } = req.body;
    
    if (minimumPayout && (minimumPayout < 50 || minimumPayout > 10000)) {
      return res.status(400).json({
        success: false,
        message: 'Minimum payout must be between $50 and $10,000'
      });
    }
    
    const updateData = {};
    if (paymentMethod) {
      updateData['profile.paymentMethod'] = paymentMethod;
    }
    if (minimumPayout) {
      updateData['profile.minimumPayout'] = minimumPayout;
    }
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select('-password');
    
    console.log(`✅ Payment settings updated for ${user.email}`);
    
    res.json({
      success: true,
      message: 'Payment settings updated successfully'
    });
  } catch (error) {
    console.error('❌ Payment settings update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment settings'
    });
  }
});

// Toggle Two-Factor Authentication
app.put('/api/settings/2fa', authenticateToken, async (req, res) => {
  try {
    const { enabled } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 'profile.twoFactorEnabled': enabled === true },
      { new: true }
    ).select('-password');
    
    console.log(`✅ 2FA ${enabled ? 'enabled' : 'disabled'} for ${user.email}`);
    
    res.json({
      success: true,
      message: `Two-factor authentication ${enabled ? 'enabled' : 'disabled'} successfully`
    });
  } catch (error) {
    console.error('❌ 2FA toggle error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update two-factor authentication'
    });
  }
});

// Delete Account
app.delete('/api/settings/account', authenticateToken, async (req, res) => {
  try {
    const { password, confirmation } = req.body;
    
    if (confirmation !== 'DELETE') {
      return res.status(400).json({
        success: false,
        message: 'Please type DELETE to confirm'
      });
    }
    
    // Verify password
    const user = await User.findById(req.user._id);
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password'
      });
    }
    
    // Delete user's data
    await Placement.deleteMany({ userId: req.user._id });
    await Website.deleteMany({ userId: req.user._id });
    await Campaign.deleteMany({ userId: req.user._id });
    
    // Delete user account
    await User.findByIdAndDelete(req.user._id);
    
    console.log(`🗑️ Account deleted: ${user.email}`);
    
    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('❌ Account deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account'
    });
  }
});

// Get Active Sessions (mock data for demo)
app.get('/api/settings/sessions', authenticateToken, async (req, res) => {
  try {
    const sessions = [
      {
        id: '1',
        device: 'Chrome on Windows',
        location: 'New York, United States',
        ip: '192.168.1.1',
        lastActive: new Date(),
        current: true
      },
      {
        id: '2',
        device: 'Safari on iPhone',
        location: 'Los Angeles, United States',
        ip: '192.168.1.2',
        lastActive: new Date(Date.now() - 86400000),
        current: false
      }
    ];
    
    res.json({
      success: true,
      sessions
    });
  } catch (error) {
    console.error('❌ Sessions fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sessions'
    });
  }
});

// Logout from specific session
app.delete('/api/settings/sessions/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    console.log(`✅ Session ${sessionId} logged out for ${req.user.email}`);
    
    res.json({
      success: true,
      message: 'Session logged out successfully'
    });
  } catch (error) {
    console.error('❌ Session logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to logout session'
    });
  }
});


app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
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
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


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
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adshark00@gmail.com',
    pass: 'iasy nmqs bzpa favn',
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Email service error:', error);
  } else {
    console.log('✅ Email service ready to send messages');
  }
});
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    createAdminUser();
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
// =============================================================================
// UPDATE USER SCHEMA - Add Password Reset Fields
// =============================================================================

// In your server.js, update the userSchema to include these fields:

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
  
  // EMAIL VERIFICATION FIELDS
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpires: {
    type: Date
  },
  isAdmin: { type: Boolean, default: false },
  // PASSWORD RESET FIELDS - ADD THESE TWO FIELDS
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  // END OF PASSWORD RESET FIELDS
  
  balance: {
    type: Number,
    default: 0
  },
  profile: {
    company: String,
    phone: String,
    country: String,
    avatar: String,
    address: String,
    city: String,
    zipCode: String,
    taxId: String,
    paymentMethod: String,
    paymentDetails: Object,
    emailNotifications: Boolean,
    paymentAlerts: Boolean,
    performanceReports: Boolean,
    weeklyDigest: Boolean,
    twoFactorEnabled: Boolean,
    lastPasswordChange: Date,
    minimumPayout: Number
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Password hashing and other methods remain the same...
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

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

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
  landingUrls: [{
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (url) {
        // Validate URL format
        const urlPattern = /^https?:\/\/.+/;
        return urlPattern.test(url);
      },
      message: 'Invalid URL format'
    }
  }],
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
    impressions: Number,
    cpm: Number,
    pricePerURL: Number,
    totalPrice: Number,
    urlCount: Number
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
const authenticateAdmin = async (req, res, next) => {
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

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
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

// Create Admin User on Server Start (add to server startup)
async function createAdminUser() {
  try {
    const adminEmail = 'admin@mail.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const adminUser = new User({
        name: 'System Administrator',
        email: adminEmail,
        password: 'Admin789',
        userType: 'advertiser',
        isAdmin: true,
        isVerified: true,
        isActive: true
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully');
    }
  } catch (error) {
    console.error('❌ Admin user creation error:', error.message);
  }
}
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
function getVerificationEmailHTML(userName, verificationLink) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9ff;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(23, 28, 107, 0.08);
        }
        .header {
          background: linear-gradient(135deg, #171C6B 0%, #2d4ef5 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .logo {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: 600;
          color: #171C6B;
          margin-bottom: 20px;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .content h2 {
          color: #171C6B;
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 20px;
        }
        .content p {
          color: #666;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 16px 32px;
          background: #171C6B;
          color: white !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
          transition: all 0.2s ease;
        }
        .button:hover {
          background: #151a5c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(23, 28, 107, 0.3);
        }
        .alt-link {
          background: #f8f9ff;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          word-break: break-all;
        }
        .alt-link p {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666;
        }
        .alt-link a {
          color: #171C6B;
          font-size: 14px;
        }
        .footer {
          padding: 30px;
          background: #f8f9ff;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer p {
          color: #999;
          font-size: 14px;
          margin: 5px 0;
        }
        .warning {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .warning p {
          color: #991b1b;
          margin: 0;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">T</div>
          <h1>TrafficStars</h1>
        </div>
        
        <div class="content">
          <h2>Welcome to TrafficStars, ${userName}! 👋</h2>
          
          <p>Thank you for signing up! We're excited to have you on board.</p>
          
          <p>To complete your registration and start using TrafficStars, please verify your email address by clicking the button below:</p>
          
          <center>
            <a href="${verificationLink}" class="button">Verify Email Address</a>
          </center>
          
          <div class="alt-link">
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <a href="${verificationLink}">${verificationLink}</a>
          </div>
          
          <div class="warning">
            <p><strong>⚠️ Important:</strong> This verification link will expire in 24 hours. If you didn't create an account with TrafficStars, please ignore this email.</p>
          </div>
          
          <p>Need help? Contact our support team at support@trafficstars.com</p>
        </div>
        
        <div class="footer">
          <p><strong>TrafficStars Ltd.</strong></p>
          <p>Premium Traffic Solutions for Digital Advertising</p>
          <p style="margin-top: 15px;">© ${new Date().getFullYear()} TrafficStars. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getWelcomeEmailHTML(userName, userType) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9ff;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(23, 28, 107, 0.08);
        }
        .header {
          background: linear-gradient(135deg, #171C6B 0%, #2d4ef5 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .logo {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: 600;
          color: #171C6B;
          margin-bottom: 20px;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .success-icon {
          font-size: 64px;
          text-align: center;
          margin: 20px 0;
        }
        .content h2 {
          color: #171C6B;
          font-size: 24px;
          text-align: center;
          margin-bottom: 20px;
        }
        .content p {
          color: #666;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 16px 32px;
          background: #171C6B;
          color: white !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
        }
        .features {
          background: #f8f9ff;
          padding: 25px;
          border-radius: 8px;
          margin: 25px 0;
        }
        .features h3 {
          color: #171C6B;
          font-size: 18px;
          margin-top: 0;
        }
        .features ul {
          margin: 15px 0;
          padding-left: 20px;
        }
        .features li {
          color: #666;
          margin: 10px 0;
        }
        .footer {
          padding: 30px;
          background: #f8f9ff;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer p {
          color: #999;
          font-size: 14px;
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">T</div>
          <h1>TrafficStars</h1>
        </div>
        
        <div class="content">
          <div class="success-icon">🎉</div>
          <h2>Email Verified Successfully!</h2>
          
          <p>Congratulations, ${userName}! Your email has been verified and your ${userType} account is now active.</p>
          
          <center>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5000'}" class="button">Go to Dashboard</a>
          </center>
          
          <div class="features">
            <h3>What's Next?</h3>
            <ul>
              ${userType === 'advertiser' ? `
                <li>📊 Create your first advertising campaign</li>
                <li>🎯 Set up targeting and budget</li>
                <li>📈 Track your campaign performance</li>
                <li>💳 Add funds to your account</li>
              ` : `
                <li>🌐 Add your websites</li>
                <li>📍 Create ad placements</li>
                <li>💰 Start earning from your traffic</li>
                <li>📊 Monitor your earnings in real-time</li>
              `}
            </ul>
          </div>
          
          <p>If you have any questions or need assistance, our support team is here to help at support@trafficstars.com</p>
        </div>
        
        <div class="footer">
          <p><strong>TrafficStars Ltd.</strong></p>
          <p>Premium Traffic Solutions for Digital Advertising</p>
          <p style="margin-top: 15px;">© ${new Date().getFullYear()} TrafficStars. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Function to send verification email
async function sendVerificationEmail(email, userName, verificationToken) {
  const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: '"TrafficStars" <adshark00@gmail.com>',
    to: email,
    subject: 'Verify Your TrafficStars Account',
    html: getVerificationEmailHTML(userName, verificationLink)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
}

// Function to send welcome email after verification
async function sendWelcomeEmail(email, userName, userType) {
  const mailOptions = {
    from: '"TrafficStars" <adshark00@gmail.com>',
    to: email,
    subject: 'Welcome to TrafficStars! 🎉',
    html: getWelcomeEmailHTML(userName, userType)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Welcome email failed:', error);
    return false;
  }
}
function getPasswordResetEmailHTML(userName, resetLink) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9ff;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(23, 28, 107, 0.08);
        }
        .header {
          background: linear-gradient(135deg, #171C6B 0%, #2d4ef5 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .logo {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: 600;
          color: #171C6B;
          margin-bottom: 20px;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .content h2 {
          color: #171C6B;
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 20px;
        }
        .content p {
          color: #666;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 16px 32px;
          background: #171C6B;
          color: white !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
          transition: all 0.2s ease;
        }
        .button:hover {
          background: #151a5c;
        }
        .alt-link {
          background: #f8f9ff;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          word-break: break-all;
        }
        .alt-link p {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666;
        }
        .alt-link a {
          color: #171C6B;
          font-size: 14px;
        }
        .warning {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .warning p {
          color: #991b1b;
          margin: 0;
          font-size: 14px;
        }
        .footer {
          padding: 30px;
          background: #f8f9ff;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer p {
          color: #999;
          font-size: 14px;
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">T</div>
          <h1>TrafficStars</h1>
        </div>
        
        <div class="content">
          <h2>Reset Your Password 🔐</h2>
          
          <p>Hi ${userName},</p>
          
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          
          <center>
            <a href="${resetLink}" class="button">Reset Password</a>
          </center>
          
          <div class="alt-link">
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <a href="${resetLink}">${resetLink}</a>
          </div>
          
          <div class="warning">
            <p><strong>⚠️ Important:</strong></p>
            <p>• This link will expire in 1 hour</p>
            <p>• If you didn't request this, please ignore this email</p>
            <p>• Your password won't change until you create a new one</p>
          </div>
          
          <p>Need help? Contact our support team at support@trafficstars.com</p>
        </div>
        
        <div class="footer">
          <p><strong>TrafficStars Ltd.</strong></p>
          <p>Premium Traffic Solutions for Digital Advertising</p>
          <p style="margin-top: 15px;">© ${new Date().getFullYear()} TrafficStars. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getPasswordResetConfirmationHTML(userName) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9ff;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(23, 28, 107, 0.08);
        }
        .header {
          background: linear-gradient(135deg, #171C6B 0%, #2d4ef5 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .logo {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: 600;
          color: #171C6B;
          margin-bottom: 20px;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        .success-icon {
          font-size: 64px;
          margin: 20px 0;
        }
        .content h2 {
          color: #171C6B;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .content p {
          color: #666;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 16px 32px;
          background: #171C6B;
          color: white !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
        }
        .footer {
          padding: 30px;
          background: #f8f9ff;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer p {
          color: #999;
          font-size: 14px;
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">T</div>
          <h1>TrafficStars</h1>
        </div>
        
        <div class="content">
          <div class="success-icon">✅</div>
          <h2>Password Reset Successful!</h2>
          
          <p>Hi ${userName},</p>
          
          <p>Your password has been successfully changed. You can now sign in with your new password.</p>
          
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5000'}" class="button">Go to Login</a>
          
          <p style="margin-top: 30px; color: #991b1b;">If you didn't make this change, please contact our support team immediately.</p>
        </div>
        
        <div class="footer">
          <p><strong>TrafficStars Ltd.</strong></p>
          <p>© ${new Date().getFullYear()} TrafficStars. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
async function sendPasswordResetEmail(email, userName, resetToken) {
  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: '"TrafficStars" <adshark00@gmail.com>',
    to: email,
    subject: 'Reset Your TrafficStars Password',
    html: getPasswordResetEmailHTML(userName, resetLink)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Password reset email failed:', error);
    return false;
  }
}

async function sendPasswordResetConfirmation(email, userName) {
  const mailOptions = {
    from: '"TrafficStars" <adshark00@gmail.com>',
    to: email,
    subject: 'Your Password Has Been Reset',
    html: getPasswordResetConfirmationHTML(userName)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset confirmation sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Confirmation email failed:', error);
    return false;
  }
}


// 4. ADD NEW ROUTES TO server.js
// -----------------------------------------------------------------------------

// Request Password Reset
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success (security: don't reveal if email exists)
    if (!user) {
      console.log(`⚠️ Password reset requested for non-existent email: ${email}`);
      return res.json({
        success: true,
        message: 'If an account exists with this email, you will receive password reset instructions.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpires;
    await user.save();

    // Send email
    const emailSent = await sendPasswordResetEmail(user.email, user.name, resetToken);

    if (!emailSent) {
      console.warn('⚠️ Reset token created but email failed to send');
    }

    console.log(`✅ Password reset requested for: ${email}`);

    res.json({
      success: true,
      message: 'If an account exists with this email, you will receive password reset instructions.'
    });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request'
    });
  }
});

// Verify Reset Token
app.get('/api/auth/verify-reset-token/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token'
      });
    }

    res.json({
      success: true,
      message: 'Token is valid',
      email: user.email
    });

  } catch (error) {
    console.error('❌ Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify token'
    });
  }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    // Validation
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Find user with valid token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token'
      });
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.profile = user.profile || {};
    user.profile.lastPasswordChange = new Date();
    await user.save();

    // Send confirmation email
    await sendPasswordResetConfirmation(user.email, user.name);

    console.log(`✅ Password reset successful for: ${user.email}`);

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });

  } catch (error) {
    console.error('❌ Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
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

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = new User({
      name,
      email,
      password,
      userType,
      isVerified: false,
      verificationToken,
      verificationTokenExpires
    });

    await user.save();

    // Send verification email
    const emailSent = await sendVerificationEmail(email, name, verificationToken);

    if (!emailSent) {
      console.warn('⚠️ User created but verification email failed to send');
    }

    console.log(`✅ New ${userType} registered: ${email} (verification pending)`);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Please check your email to verify your account.',
      requiresVerification: true,
      email: email
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

// EMAIL VERIFICATION ROUTE
app.get('/api/auth/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Find user with this token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Update user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name, user.userType);

    console.log(`✅ Email verified for: ${user.email}`);

    res.json({
      success: true,
      message: 'Email verified successfully! You can now login.',
      userType: user.userType
    });

  } catch (error) {
    console.error('❌ Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification failed. Please try again.'
    });
  }
});

// RESEND VERIFICATION EMAIL ROUTE
app.post('/api/auth/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'This account is already verified'
      });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    // Send new verification email
    const emailSent = await sendVerificationEmail(user.email, user.name, verificationToken);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email'
      });
    }

    console.log(`✅ Verification email resent to: ${email}`);

    res.json({
      success: true,
      message: 'Verification email sent! Please check your inbox.'
    });

  } catch (error) {
    console.error('❌ Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend verification email'
    });
  }
});
// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, userType, remember } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // SPECIAL HANDLING FOR ADMIN
    if (user.isAdmin) {
      user.lastLogin = new Date();
      await user.save();
      
      const token = user.generateAuthToken();
      
      console.log('✅ Admin logged in: ' + email);

      return res.json({
        success: true,
        message: 'Admin login successful',
        isAdmin: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          isAdmin: true
        },
        token
      });
    }

    // REGULAR USER VALIDATION
    if (!userType) {
      return res.status(400).json({
        success: false,
        message: 'User type is required'
      });
    }

    if (user.userType !== userType) {
      return res.status(401).json({
        success: false,
        message: `This account is registered as ${user.userType}, not ${userType}`
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated. Please contact support.'
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email address before logging in',
        requiresVerification: true,
        email: user.email
      });
    }

    user.lastLogin = new Date();
    await user.save();
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
// Helper function to normalize and validate URL
function normalizeURL(url) {
  if (!url) return null;

  // Remove whitespace
  url = url.trim();

  // If already has protocol, validate and return
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Remove www. if present at start
  url = url.replace(/^www\./, '');

  // Add https://
  return 'https://' + url;
}

// Helper function to validate domain
function isValidDomain(url) {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    // Basic domain validation
    const domainPattern = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/;
    return domainPattern.test(domain);
  } catch (e) {
    return false;
  }
}
// Create campaign
app.post('/api/campaigns', authenticateToken, async (req, res) => {
  try {
    console.log('📄 Creating campaign:', req.body.campaignName);

    const campaignData = req.body;

    // Validate required fields
    if (!campaignData.campaignName || !campaignData.landingUrls || !campaignData.campaignType) {
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

    // Validate and normalize URLs
    const landingUrls = Array.isArray(campaignData.landingUrls)
      ? campaignData.landingUrls
      : [campaignData.landingUrls];

    if (landingUrls.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one landing page URL is required'
      });
    }

    // Normalize and validate each URL
    const normalizedUrls = [];
    for (let url of landingUrls) {
      const normalized = normalizeURL(url);

      if (!normalized || !isValidDomain(normalized)) {
        return res.status(400).json({
          success: false,
          message: `Invalid URL format: ${url}`
        });
      }

      normalizedUrls.push(normalized);
    }

    // Remove duplicates
    const uniqueUrls = [...new Set(normalizedUrls)];

    // Validate package data
    const packageData = campaignData.package || {};

    if (!packageData.impressions || !packageData.totalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Invalid package data'
      });
    }

    // Validate pricing
    const urlCount = uniqueUrls.length;
    const pricePerURL = packageData.pricePerURL || 0;
    const expectedTotal = pricePerURL * urlCount;

    // Allow for small rounding differences
    if (Math.abs(expectedTotal - packageData.totalPrice) > 0.01) {
      return res.status(400).json({
        success: false,
        message: 'Price calculation mismatch'
      });
    }

    const campaign = new Campaign({
      campaignName: campaignData.campaignName,
      landingUrls: uniqueUrls,
      campaignType: campaignData.campaignType,
      description: campaignData.description || '',
      trafficPackage: {
        amount: packageData.amount || 'custom',
        impressions: parseInt(packageData.impressions),
        cpm: parseFloat(packageData.cpm || 0),
        pricePerURL: parseFloat(pricePerURL),
        totalPrice: parseFloat(packageData.totalPrice),
        urlCount: urlCount
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
    console.log(`   URLs: ${uniqueUrls.length} | Total: $${packageData.totalPrice}`);

    // Simulate stats generation after 2 seconds
    setTimeout(async () => {
      try {
        const impressionsPerURL = parseInt(packageData.impressions);
        const totalImpressions = impressionsPerURL * urlCount;
        const randomImpressions = Math.floor(totalImpressions * (0.1 + Math.random() * 0.05));
        const randomClicks = Math.floor(randomImpressions * 0.02) + 1;
        const spent = parseFloat(packageData.totalPrice) * 0.1;

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
app.get('/verify-email', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'verify-email.html'));
});
app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'reset-password.html'));
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'forgot-password.html'));
});
app.get('/admin_panel.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin_panel.html'));
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
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } })
      .select('-password')
      .sort({ createdAt: -1 });

    // Get campaign and placement counts for each user
    const usersWithStats = await Promise.all(users.map(async (user) => {
      const campaigns = await Campaign.find({ userId: user._id });
      const placements = await Placement.find({ userId: user._id });
      
      const totalSpent = campaigns.reduce((sum, c) => sum + (c.stats?.spent || 0), 0);
      const totalRevenue = placements.reduce((sum, p) => sum + (p.stats?.revenue || 0), 0);

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        balance: user.balance || 0,
        isActive: user.isActive,
        isVerified: user.isVerified,
        campaignCount: campaigns.length,
        placementCount: placements.length,
        totalSpent: totalSpent.toFixed(2),
        totalRevenue: totalRevenue.toFixed(2),
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      };
    }));

    console.log(`📊 Admin fetched ${users.length} users`);

    res.json({
      success: true,
      users: usersWithStats
    });
  } catch (error) {
    console.error('❌ Admin users fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Get All Campaigns (Admin Only)
app.get('/api/admin/campaigns', authenticateAdmin, async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('userId', 'name email userType')
      .sort({ createdAt: -1 });

    console.log(`📊 Admin fetched ${campaigns.length} campaigns`);

    res.json({
      success: true,
      campaigns
    });
  } catch (error) {
    console.error('❌ Admin campaigns fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaigns'
    });
  }
});

// Get All Placements (Admin Only)
app.get('/api/admin/placements', authenticateAdmin, async (req, res) => {
  try {
    const placements = await Placement.find()
      .populate('userId', 'name email userType')
      .sort({ createdAt: -1 });

    console.log(`📊 Admin fetched ${placements.length} placements`);

    res.json({
      success: true,
      placements
    });
  } catch (error) {
    console.error('❌ Admin placements fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch placements'
    });
  }
});

// Update Campaign Status (Admin Override)
app.patch('/api/admin/campaigns/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'active', 'paused', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'name email');

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    console.log(`✅ Admin changed campaign ${campaign._id} status to ${status}`);
    console.log(`   User: ${campaign.userId.email}`);

    res.json({
      success: true,
      message: 'Campaign status updated successfully',
      campaign
    });
  } catch (error) {
    console.error('❌ Admin campaign update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update campaign'
    });
  }
});

// Top-up User Balance (Admin Only)
app.post('/api/admin/users/:id/topup', authenticateAdmin, async (req, res) => {
  try {
    const { amount, note } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    if (amount > 100000) {
      return res.status(400).json({
        success: false,
        message: 'Maximum top-up amount is $100,000'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const oldBalance = user.balance || 0;
    user.balance = oldBalance + parseFloat(amount);
    await user.save();

    console.log(`💰 Admin topped up ${user.email} balance`);
    console.log(`   Amount: $${amount}`);
    console.log(`   Old Balance: $${oldBalance.toFixed(2)}`);
    console.log(`   New Balance: $${user.balance.toFixed(2)}`);
    console.log(`   Note: ${note || 'No note'}`);

    res.json({
      success: true,
      message: 'Balance topped up successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        oldBalance: oldBalance.toFixed(2),
        newBalance: user.balance.toFixed(2),
        amountAdded: parseFloat(amount).toFixed(2)
      }
    });
  } catch (error) {
    console.error('❌ Admin balance top-up error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to top-up balance'
    });
  }
});

// Toggle User Active Status (Admin Only)
app.patch('/api/admin/users/:id/toggle-active', authenticateAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    console.log(`✅ Admin ${user.isActive ? 'activated' : 'deactivated'} user ${user.email}`);

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('❌ Admin user toggle error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle user status'
    });
  }
});

// Get Admin Dashboard Stats
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isAdmin: { $ne: true } });
    const activeUsers = await User.countDocuments({ isAdmin: { $ne: true }, isActive: true });
    const totalCampaigns = await Campaign.countDocuments();
    const activeCampaigns = await Campaign.countDocuments({ status: 'active' });
    const totalPlacements = await Placement.countDocuments();
    const activePlacements = await Placement.countDocuments({ status: 'active' });

    const allCampaigns = await Campaign.find();
    const totalRevenue = allCampaigns.reduce((sum, c) => sum + (c.stats?.spent || 0), 0);

    const allPlacements = await Placement.find();
    const totalPayouts = allPlacements.reduce((sum, p) => sum + (p.stats?.revenue || 0), 0);

    res.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: totalUsers - activeUsers
        },
        campaigns: {
          total: totalCampaigns,
          active: activeCampaigns
        },
        placements: {
          total: totalPlacements,
          active: activePlacements
        },
        revenue: {
          total: totalRevenue.toFixed(2),
          payouts: totalPayouts.toFixed(2),
          profit: (totalRevenue - totalPayouts).toFixed(2)
        }
      }
    });
  } catch (error) {
    console.error('❌ Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin stats'
    });
  }
});

// Delete User (Admin Only)
app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete all user data
    await Campaign.deleteMany({ userId: user._id });
    await Placement.deleteMany({ userId: user._id });
    await Website.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);

    console.log(`🗑️ Admin deleted user: ${user.email}`);

    res.json({
      success: true,
      message: 'User and all associated data deleted successfully'
    });
  } catch (error) {
    console.error('❌ Admin user delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
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
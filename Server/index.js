const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");  
const authRoutes = require("./routes/AuthRoutes");
//routers
const UserRoutes=require('./routes/UserRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const sequelize = require('./config/config');
const influencerRoutes = require('./routes/influencer');
const InfluencerAdRequest=require("./routes/influncerAdRequest");
const external=require("./routes/externalApiRoutes")
const bookingRoutes = require('./routes/bookingRoutes');
dotenv.config();
const app = express();
const path = require('path');
const contact=require("./routes/MessageRoutes");
const PaymentSubscription=require("./routes/PaymentSubscription");
const UsersubscriptionRoutes = require('./routes/userSubscriptionPlanRoutes');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// إعداد express-session
app.use(session({
  secret: process.env.CLIENT_SECRET,  // اختر مفتاح سري قوي هنا
  resave: false,
  saveUninitialized: true,
  cookie: { secure:true}  // تأكد من تعيينها إلى true إذا كنت تستخدم HTTPS في الإنتاج
}));

// إعداد Passport.js
app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', // مثلاً React dev server
  'https://your-production-site.com'
];

app.use(cors(
    {origin:allowedOrigins,
    credentials:true}
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json()); 

//auth middlware
app.use('/user',UserRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/subscriptions/user', UsersubscriptionRoutes);
app.use('/api/influencer', influencerRoutes);
app.use('/auth',authRoutes);
app.use('/api',contact)
app.use('/api',InfluencerAdRequest)
app.use('/api',external)
app.use('/api/users', bookingRoutes);
app.use('/api', PaymentSubscription);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);    
// });
// المزامنة مع قاعدة البيانات
sequelize
  .sync({ alter:false}) 
  // .sync({ force: true }) // ملاحظة: هذا يحذف الجدول إن وجد ويعيد إنشاءه من الصفر، كن حذرًا!
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//routers
const UserRoutes=require('./routes/UserRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const sequelize = require('./config/config');
const influencerRoutes = require('./routes/influencer');
dotenv.config();



const app = express();



app.use(cors(
    {origin:"http://localhost:5173",
    credentials:true}
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//auth middlware
app.use('/user',UserRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/influencer', influencerRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);    
// });
// المزامنة مع قاعدة البيانات
sequelize
  .sync({ alter: false }) 
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
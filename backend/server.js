const express = require('express')
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const cors = require('cors')


const connectDB = require('./db/connectDB')

connectDB();

const userRoutes = require('./routes/userRoute');
const blogRoutes = require('./routes/blogRoutes');

app.use(express.json())
app.use(cookieParser());




app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,  // Allow credentials (cookies)
}));

// app.use((req, res, next) => {
//   console.log('&&&&&&&&&&&&&&')
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   next();
// });

app.get('/', (req, res) => {
    res.send("Hello from nodejs")
})
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blog', blogRoutes);



// app.use((err, req, res, next) => {
//   if (err.code === 'EBADCSRFTOKEN') {
//     console.log("hi")
//     res.status(403).json({ error: 'CSRF token invalid' });
//   } else {
//     next(err);
//   }
// });


app.listen('3004','0.0.0.0',()=> {
    console.log('server listening on 3004');
})
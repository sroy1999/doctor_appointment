const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./database/database.js');
const { connectS3, listBuckets } = require('./config/imageStorage.js');
const adminRouter = require('./routes/admiinRoutes.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

connectDB();
connectS3();
listBuckets();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(morgan('dev'));
app.use(helmet());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'atoken']
}
app.use(cors(corsOptions));

app.use('/api/v1/admin', adminRouter);

const limiter = rateLimiter({
    windowMs: 15 * 60 * 60,
    max: 100,
    message: 'Too many requests, please try again later'
});
app.use(limiter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong'});
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
    });
});

const server = app.listen(port, () => {
    console.log('Server running successfully on port ',port);
});
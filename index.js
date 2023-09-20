const express = require('express');
const app = express();
const messageController = require('./messageController');
const cors = require('cors');
const morgan = require('morgan');
const allowedOrigins = [
    'http://localhost:5500',
    'http://localhost:8000',
    'https://portfolio-nwsq.onrender.com',
    'https://portfolio-erlotdlwa-sukkoth.vercel.app/',
    'https://portfolio-seven-iota-83.vercel.app',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
            console.log('CORS ALLOWED');
        } else {
            callback(new Error('Not allowed by CORS'));
            console.error('DOMAIN NOT ALLOWED BY CORS');
        }
    },
};

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.post('/message', messageController.message);
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.use((req, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

app.listen(process.env.APP_PORT, () =>
    console.log(`Server running on port ${process.env.APP_PORT}`)
);

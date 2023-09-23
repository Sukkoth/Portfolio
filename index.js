const express = require('express');
const app = express();
const messageController = require('./messageController');
const morgan = require('morgan');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.post('/message', messageController.message);
app.get('/', (req, res) => {
    res.render('index');
});

app.use((req, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

app.listen(process.env.APP_PORT, () =>
    console.log(`Server running on port ${process.env.APP_PORT}`)
);

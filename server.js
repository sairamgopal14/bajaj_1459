const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Serve static HTML files from the 'html' directory
app.use(express.static(path.join(__dirname, 'html')));

// Serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// Endpoint to handle POST requests to /bfhl
app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    console.log(data);

    const numbers = data.filter(item => /^\d+$/.test(item));
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
    const highestAlphabet = alphabets.reduce((max, item) => 
        item.toLowerCase() > max.toLowerCase() ? item : max, '');

    const response = {
        is_success: true,
        user_id: "n_sairam_gopal",
        email: "ramgopal4401@gmail.com",
        roll_number: "21BRS1459",
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    };

    console.log(`Stored data: ${data}`);
    res.json(response);
});

// Endpoint to handle GET requests to /bfhl
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

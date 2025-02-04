// Write your server logic here
const http = require('http');
const path = require('path');
const fs = require('fs');


const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    
    if (req.url === '/questions') {
        const filePath = path.join(__dirname, 'questions.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
            try {
                const jsonData = JSON.parse(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(jsonData));
            } catch (parseError) {
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } else {
        res.end('No Route found');
    }

});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
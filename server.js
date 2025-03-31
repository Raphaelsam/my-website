const express = require('express');
const mysql = require('mysql2'); // Use mysql2 for better compatibility
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: "R@fey4182",  // Change this if needed
    database: "company",
    port: 3306 
});

// Connect to Database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
        return;
    }
    console.log("✅ Connected to MySQL database!");
});

// API Route to Insert Data
app.post('/addEmployee', (req, res) => {
    const { name, age, number, email } = req.body;

    if (!name || !age || !number || !email) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const sql = "INSERT INTO employees (name, age, number, email) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, age, number, email], (err, result) => {
        if (err) {
            console.error("Error inserting data: " + err);
            return res.status(500).json({ message: "Database error!" });
        }
        res.status(200).json({ message: "Employee added successfully!" });
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

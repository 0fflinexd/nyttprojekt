// Import database
const dbDriver = require ('better-sqlite3');
// conect to database
const db = dbDriver('bands2.0.db');

// Import erxpress
const express = require('express');

// Create express app
const app = express();

// Express setup
// Serve a static frontend
app.use(express.static('frontend'));
// Tell express to use json
app.use(express.json());

// REST API  ROUTES
app.get('/bands',(req,res)=>{
    //erq = request
    //res = response
    const bands = db.prepare('SELECT * FROM bands').all();

//send back to json
res.json(bands);
});

app.get('/bands/:id',(req,res) => {
    //get the url id
    const id = req.params.id;
    
    let statment  = db.prepare ('SELECT * FROM bands WHERE id = :id');
    let result = statment.all({
        id
    });

    // Send back band or error
    res.json(result[0]|| {'error': 'No band matching id'});
})
//Start the server 
app.listen(3000, () => {
    console.log('Server started on port 3000.');
});

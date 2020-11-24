const express = require('express')
const app = express();

const request = require('request')
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});


const cors =  require('cors')
app.use(cors())

var port = process.env.PORT || 3030 // set port(s)

app.use(express.static(__dirname))

app.get("/", function(req, res) {
    res.render("index")
});

app.listen(port, function(){
    console.log('app up and running on port ' + port)
})

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const User = require('./Users.js')

// Get list of all user IDs
app.get('/user', (req, res) => {
    res.json(User.getAllIDs()); 
    return;
})

// Create User 
app.post('/user', (req, res) => {
    let {username, password, keywords} = req.body;
    let u = User.create(username, password, keywords);
    if(u == null) {
        res.status(400).send("Bad Request");
    }
    return res.json(u);
})


// Delete user by ID
app.delete('/user/:id', (req, res) => {
    let u = User.findByID(req.params.id); 
    if ( u == null) { 
        res.status(404).send("User not found: " + req.params.id) // handle call to nonexistent book
        return;
    } 
    u.delete();
    res.json(true); 
})



// Attempt Login
app.post('/login', (req, res) => {
    let u = User.findByUsername(req.body.username);
    if ( u == null) { 
        // res.status(404).send("User not found: " + req.params.uName) // handle call to nonexistent book
        res.json(false); // HERE IS THE PROBLEM
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");

        let verified = User.verifyUser(req.body.username, req.body.password)
        res.json(verified); 
    }
    return    
})

// get user keywords
app.get('/getkeywords/:uName', (req, res) => {
    let u = User.findByUsername(req.params.uName);

    if (u == null) {
        res.status(404).send("User not found: " + req.params.uName) // handle call to nonexistent book
        return false;
    }

    let keywords = u.keywords

    res.json(keywords);
    return;
})

// add keyword to
app.post('/addkeyword', (req, res) => {
    let u = User.findByUsername(req.body.username);
    if (u == null) {
        res.status(404).send("User not found: " + req.body.username) // handle call to nonexistent book
        return false;
    } 
    u.keywords.push(req.body.keyword)
    res.json(u.keywords)
})

// delete keyword
app.post('/deletekeyword', (req, res) => {
    let u = User.findByUsername(req.body.username);
    if(u==null) {
        res.status(404).send("User not found: " + req.body.username)    
        return false;
    }
    for(let i = 0; i < u.keywords.length; i ++) {
        if(u.keywords[i] == req.body.keyword) {
            u.keywords.splice(i,1)
        }
    }

    res.json(u.keywords)    

})

// check if user exists
app.get('/usernameexists/:uName', (req, res) => {
    let u = User.findByUsername(req.params.uName);
    if (u == null) {
        res.json(false)
    } else {
        res.json(true);
    }
    return;
})

const sent = require('./sentiment')

// news sentiment request
app.get('/newssentiment/:ticker', async (req, res) => {
    let s = await sent.getNewsSentiment(req.params.ticker)
    if(Number.isNaN(s)) {
        res.json(0)
    } else {
        res.json(s)
    }
    return;
})

// twitter sentiment request
app.get('/twittersentiment/:ticker', async (req, res) => {
    let s = await sent.getTwitterSentiment(req.params.ticker)
    // console.log(s)
    if(Number.isNaN(s)) {
        res.json(0)
    } else {
        res.json(s)
    }
    return;
})




// // Get User by ID. FOR TESTING. NOT SECURE
// app.get('/user/:id', (req, res) => {
//     let u = User.findByID(req.params.id);
//     if (u == null) {
//         res.status(404).send("User not found: " + req.params.id) // handle call to nonexistent book
//         return;
//     }
//     res.json(u);
//     return;
// })

// // Get User by Username FOR TESTING. NOT SECURE
// app.get('/username/:uName', (req, res) => {
//     let u = User.findByUsername(req.params.uName);
//     if (u == null) {
//         res.status(404).send("User not found: " + req.params.uName) // handle call to nonexistent book
//         return false;
//     }
//     res.json(u);
//     return
// })

// // Update User by ID FOR TESTING. NOT SECURE.
// app.put('/user/:id', (req, res) => {
//     let u = User.findByID(req.params.id); 
//     if ( u == null) { 
//         res.status(404).send("User not found: " + req.params.id) // handle call to nonexistent book
//         return;
//     } 

//     let {username, password, keywords} = req.body; // destructure request body into title, price, authors variables
//     u.username = username;
//     u.password = password;
//     u.keywords = keywords;

//     u.update();

//     res.json(u); // response will be the updated user

// })
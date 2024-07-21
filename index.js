const express = require("express");
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

//index route for rendering index.ejs
app.get('/', function (req, res) {
    res.render("index");
});
//dashboard route
app.get('/dashboard', function (req, res) {
    res.render("dashboard")
})
//thank you route
app.get('/thankyou', function (req, res) {
    res.render('thankyou')
})
let votes = {
    option1: 0,
    option2: 0,
    option3: 0,
    option4: 0
}

io.on("connection", function (socket) {
    console.log("New user connected " + socket.id);

    socket.emit('update_votes', votes);

    socket.on("submit_vote", (option) => {
        votes[option]++;
        io.emit('update_votes', votes);
    })

    socket.on('disconnect', function () {
        console.log("User Disconnected " + socket.id)
    })
})

// Start the server and listen on port 3000
server.listen(3000, function () {
    console.log('Server started at port 3000');
});
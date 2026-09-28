const express =require('express');

const http=require('http');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const socketIo=require('./socket_io');

//This loads your .env file into process.env
dotenv.config({
    path: path.join(__dirname, '.env')
});

const cors = require('cors');
app.use(cors());


const db = require('./utils/db-connection');
const loginRoute=require('./Routes/loginRoute');
const signupRoute=require('./Routes/signupRoute');
const messageRoute=require('./Routes/messageRoute');
const usersRoute=require('./Routes/usersRoute');


require('./models/Users');
app.use(express.json());
app.use('/api',signupRoute);
app.use('/api',loginRoute);
app.use('/api',messageRoute);
app.use('/users',usersRoute);

// ==============================
// Socket.io Server
// ==============================

const server = http.createServer(app);

socketIo(server);

// io.on("connection", (socket) => {
//     console.log("New Socket.io connection",socket.id);

//     socket.on("register",(userId)=>{
//         socket.join(`user_${userId}`);
//         console.log(
//             `User ${userId} joined room user_${userId}`
//         );
//     });


// socket.on("disconnect",()=>{
//     console.log("Socket disconnected",socket.id);
// })

// });


db.sync({alter:true}).then(()=>{
    const port = 3000;

    server.listen(port,()=>{
         console.log(`Server running on http://localhost:${port}`);
            console.log(`Socket.io running on socket.io://localhost:${port}`);
    })

}).catch((error) => {

        console.error("Database connection failed:", error);

    });
const jwt = require("jsonwebtoken");
module.exports=(io)=>{
    // socket authentication
io.use((socket, next)=>{
    const token = socket.handshake.auth.token;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        next();

    }catch(error){
        next(new Error("Authentication failed"));

    }
});


}
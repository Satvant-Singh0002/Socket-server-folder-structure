const {Server}=require('socket.io');
const socketAuth=require('./middleware');
const chatHandlers=require('./handlers/chat');
const socketIo=(server)=>{
    const io=new Server(server,{
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});
socketAuth(io);
io.on("connection", (socket) => {
    
chatHandlers(socket,io);
socket.on("disconnect",()=>{
    console.log("Socket disconnected",socket.id);
})

});


}
module.exports=socketIo;
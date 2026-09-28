module.exports=(socket,io)=>{

    // ==============================
    // Register user
    // ==============================

    socket.on("register", (userId) => {

        socket.join(`user_${userId}`);

        console.log(
            `User ${userId} joined room user_${userId}`
        );

    });
    // receiving message from the client
socket.on("message",(data)=>{
    const {
        senderId,
        receiverId,
        text
    }=data;
    console.log("Received message:",data);

    // sending message to the receiver
io.to(`user_${receiverId}`).emit(
    "message",
    text
);
});

}
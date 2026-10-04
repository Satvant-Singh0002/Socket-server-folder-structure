module.exports=(socket,io)=>{

    // ==============================
    // Register user
    // ==============================

    socket.on("join_room", (roomId) => {

        socket.join(roomId);

        console.log(
            `User ${socket.userId} joined room ${roomId}`
        );

    });
    // receiving message from the client
socket.on("message",(data)=>{
    const {
        roomId,
        senderId,
        receiverId,
        text
    }=data;
    console.log("Received message:",data);

    // sending message to the receiver
io.to(roomId).emit(
    "message",
    text
);
});

}
const Message=require('../models/Message');



// ======================================
// Add Message
// ======================================

const addMessages = async (req, res) => {
     console.log("ADD MESSAGE API CALLED");
        console.log("REQUEST BODY:", req.body);

    try {

        const {
            senderId,
            receiverId,
            messages
        } = req.body;


        // Check required data
        if (!senderId || !receiverId || !messages) {

            return res.status(400).json({
                success: false,
                message: "senderId, receiverId and messages are required"
            });

        }


        // Store message
        const newMessage = await Message.create({

            senderId: senderId,
            receiverId: receiverId,
            messages: messages

        });


        res.status(201).json({

            success: true,
            message: "Message stored successfully",
            data: newMessage

        });


    } catch (error) {

        console.log("ADD MESSAGE ERROR:", error);

        res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

};


// ======================================
// Show Messages Between Two Users
// ======================================

const showMessage = async (req, res) => {

    try {

        const {
            senderId,
            receiverId
        } = req.params;


        const messages = await Message.findAll({

            where: {

                [require("sequelize").Op.or]: [

                    {
                        senderId: senderId,
                        receiverId: receiverId
                    },

                    {
                        senderId: receiverId,
                        receiverId: senderId
                    }

                ]

            },

            order: [
                ["createdAt", "ASC"]
            ]

        });


        res.status(200).json(messages);


    } catch (error) {

        console.log("GET MESSAGE ERROR:", error);

        res.status(500).json({

            success: false,
            message: "Server error"

        });

    }

};


module.exports = {
    addMessages,
    showMessage
};
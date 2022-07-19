const { ChatRoom } = require("../models/chat_room.model");
const { Message } = require("../models/messages.model");

module.exports = {
    sendMessage: async (req, res) => {

        const isChatRoomOneFound = await ChatRoom.findOne({ chatRoomName: req.body.chatRoomNameOne })
        const isChatRoomtwoFound = await ChatRoom.findOne({ chatRoomName: req.body.chatRoomNameTwo })

        if (isChatRoomOneFound) {
            console.log("bbbbbbbbbbbbbbbbbbbb")
            const message = new Message({
                idUser: req.body.idUser,
                message: req.body.message
            });
            isChatRoomOneFound.messages.push(message)
            isChatRoomtwoFound.messages.push(message)
            await message.save();
            await isChatRoomOneFound.save();
            await isChatRoomtwoFound.save();
            res.status(201).json(isChatRoomOneFound)
        }
        else{
            console.log("aaaaaaaaaaaaaaaaaaaaaaa")

            const message = new Message({
                idUser: req.body.idUser,
                message: req.body.message
            });
            const chatRoomOne = new ChatRoom({
                chatRoomName: req.body.chatRoomNameOne
            });
            const chatRoomTwo = new ChatRoom({
                chatRoomName: req.body.chatRoomNameTwo
            });
    
            chatRoomOne.messages.push(message)
            chatRoomTwo.messages.push(message)
            await message.save();
            await chatRoomOne.save();
            await chatRoomTwo.save();
            res.status(201).json(chatRoomOne)
        }
        
    },

    getUserChat: async (req, res) => {
        const chat_room = await ChatRoom.findOne({ chatRoomName: req.body.chatRoomName }).populate("messages");
        res.status(201).json(chat_room);
    },


}
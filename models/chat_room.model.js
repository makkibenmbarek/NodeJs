const mongoose = require("mongoose")


const chatRoomSchema = mongoose.Schema({
    chatRoomName: String,
    messages: [{
        type: mongoose.Types.ObjectId, ref: 'message',
        default: [],
    }],
    
}, {
    timestamps: true
});

const ChatRoom = mongoose.model("chatRoom", chatRoomSchema);

module.exports = { ChatRoom };
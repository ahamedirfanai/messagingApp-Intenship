import mongoose from "mongoose";

const messagingSchema = mongoose.Schema({
    message: 'string',
    name: 'string',
    timestamp: 'string',
    received :'boolean'
})

export default mongoose.model('messagingmessages',messagingSchema)
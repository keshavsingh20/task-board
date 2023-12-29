const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {type: String},
    userId: {type: String},
    tasks: [
        {
            taskTitle: {type: String},
            isCompleted: {type: Boolean, default: false}
        }
    ]
})

const List = mongoose.model('lists', listSchema)
module.exports = List;
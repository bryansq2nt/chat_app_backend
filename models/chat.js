
const { Schema, model } = require('mongoose');

const ChatSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },

    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },

    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]

    
}, {
    timestamps: true
});


ChatSchema.method('toJSON',function(){
    const { __v, _id, ...object} = this.toObject();
    return object;
})

module.exports = model('Chat',ChatSchema);
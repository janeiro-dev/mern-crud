var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
    title: { type: String, required: [true, 'El nombre es necesario'] },
    description: { type: String, required: true },
    hour: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: true }

    
});


module.exports = mongoose.model('Task', TaskSchema);
let mongoose = require('mongoose');

let dataSchema = new mongoose.Schema({
    program: { type: Number, default:'1'},
    data: {type:Object,default:{
            text:"hello",
            location:"Ha Noi",
            weather:"Sun",
            color:{
                r:255,
                g:255,
                b:255
            },
            temp:17

        }
    },
    status:{type:Boolean,default:false},
    led_id:{type:String,unique: true},
    location:{type:String,}
});

var Data = mongoose.model('LED', dataSchema,'Led');

module.exports = Data;

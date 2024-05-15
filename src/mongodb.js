const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://saket1333be22:7amadmin@saketcluster.re397ba.mongodb.net/compiler?retryWrites=true&w=majority&appName=saketCluster").then(()=>{
    console.log("mongodb connected");
}).catch(()=>{
    console.log('mongodb not connected');
});

const logInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    });
    
const Detail = new mongoose.model('Detail',logInSchema);

module.exports = Detail;
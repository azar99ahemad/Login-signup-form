const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/UserRegistraion")
.then(()=>{
    console.log('db connected');
})
.catch((err)=>{
    console.log(`${err}`);
})

const login_schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',login_schema)

module.exports=LogInCollection
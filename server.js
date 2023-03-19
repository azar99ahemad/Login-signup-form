const express=require("express")
const path=require('path')
const mongodb=require('./dbConnection/mongodb')

const app= express()

const port=process.env.PORT||5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const publicpath=path.join(__dirname + '/public')
app.use(express.static(publicpath))



app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/public/signup.html')
})
app.get("/login", (req,res)=>{
    res.sendFile(__dirname + '/public/login.html')
})

app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }

    const checksignup=await mongodb.findOne({
        name:req.body.name
    })
    try{
        if(checksignup.email===req.body.email && checksignup.password===req.body.password){
            res.send("User Already Exists")
        }
        else{
            await mongodb.insertMany([data])
        }
    }
    catch{
        res.send("Wrong Input")
    }
    res.status(201).sendFile(__dirname+'/public/home.html')
    
})

app.post("/login", async(req,res)=>{
    try{
        const checklogin= await mongodb.findOne({email:req.body.email})
        if(checklogin.password===req.body.password){
            res.status(201).sendFile(__dirname+'/public/home.html')
        }
        else{
            res.send("Incorrect Password")
        }
    }
    catch(err){
        res.send("wrong Detals")
    }
})


app.listen(port,()=>{
    console.log(`connected at port ${port}`)
})
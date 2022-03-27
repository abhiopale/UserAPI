const experss=require("express");
const { use } = require("express/lib/application");
const app =experss();
app.use(experss.json());
const fellowDtl=require("./animeHunt")


app.get("/",(req,res)=>{
    res.send("Hello api is working to get the all info about the fellows pls visit http://localhost:3000/api")
    })


app.get("/api",(req,res)=>{
    res.json(fellowDtl)
    })




app.post("/api/post",(req,res)=>{
    if(!req.body.number){
        return res.send("Number is required")
    }
    if(!req.body.name){
        return res.send("Name is required")
    }
    if(!req.body.email){
        return res.send("Email is required")
    }
    if(!req.body.batch){
        return res.send("Batch is required")
    }
    if(!req.body.role){
        return res.send("role is required")
    }
    const user={
        number:req.body.number,
        name:req.body.name,
        batch:req.body.batch,
        role:req.body.role,
        email:req.body.email
    }
    const same=fellowDtl.findIndex((fellow)=>{
        return user.number==fellow.number
    })
    
    if (same==-1){
        fellowDtl.push(user)
        res.send("Your data is added")
    }else{
        res.send("Number already Exist")
    }
})
app.put("/api/:number",(req,res)=>{
    const number =req.params.number
    const user={
        number:req.body.number,
        name:req.body.name,
        batch:req.body.batch,
        role:req.body.role,
        email:req.body.email
    }
    const index=fellowDtl.findIndex((fellow)=>{
        return fellow.number==number
    })
    if (index=>0){
        fellowDtl[index]=user
    } 
    res.send("Your data has been updated")
})

app.delete("/api/:number",(req,res)=>{
    const number =req.params.number
    const index=fellowDtl.findIndex((fellow)=>{
        return fellow.number==number
    })
    if (index== -1){
        res.send("no such data exists")
    }else{
        fellowDtl.splice(index,1)
        res.send("data is deleted")
    }
})
app.listen(3000,(err)=>{
    console.log("server is listening on port 3000")
})
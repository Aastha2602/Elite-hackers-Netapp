const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 5000 || process.env.PORT
const dbUrl = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PWD}@cluster0.a4ouc.mongodb.net/Sapling?retryWrites=true&w=majority`

mongoose.connect(dbUrl)
    .then(() => console.log("database connected"))

app.get("/", (req, res) => {

    res.send("Welcome to Elite Hackers Backend")
})
app.get("/register", (req, res) => {

    res.send("Registration of user")
})
app.post("/register", async (req, res) => {

    const { name, email, pwd } = req.body

    console.log(req.body)
    console.log(name, email, pwd)

    //check if username exist
    const checkName = await User.findOne({ username: name })

    // if exist return an error response    
    if (checkName) {

        res.status(404).json({ message: "username already in use" })
        console.log(res.json())
        return;
    }

    //check if email exist
    const checkMail = await User.findOne({ email: email })

    // if email is already used return error
    if (checkMail) {

        res.status(404).json({ message: "email is already in use" })
        console.log(res.json().message)
        return;
    }

    // if the user doesn't exist, save the information in database
    const user = new User({

        username: name,
        email: email,
        password: pwd
    })

    user.save()

    res.json({

        message: "success"
    })
})

app.get('/login',(req,res)=>{

    res.send("Login page")
})
app.post('/login', async(req,res)=>{

    const {name, pwd} = req.body

    const checkUser = await User.find({username: name, password: pwd}) 
    console.log(checkUser)

    if(checkUser.length) {

        console.log("successful")
        res.json({
            message: "Login successful"
        })
        return;
    }

    res.status(404).json({
        message: "invalid login"
    })
})

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
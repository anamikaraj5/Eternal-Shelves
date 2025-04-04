import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {authenticate} from '../Middleware/authenticate.js'
import { users } from '../schemas/schema1.js'


dotenv.config()

const userauth=Router()


//signup page
userauth.post('/signup', async (req, res) => {
    try {
        const { FullName, UserName, Email, Password } = req.body;

        const existingUser = await users.findOne({ username: UserName })
        if (existingUser) {
            return res.status(400).send("User already exists")
        }

        const userCount = await users.countDocuments()
        const Roles = userCount === 0 ? "admin" : "user"

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new users({
            name: FullName,
            roles: Roles,
            username: UserName,
            email: Email,
            password: hashedPassword
        })
        await newUser.save();

        res.status(201).send("Successful Registration");
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})



//login page
userauth.post('/login', async (req,res)=>
{
    try
    {
        const {UserName,Password} = req.body
        
        const result = await users.findOne({username:UserName})   

        if(result)
        { 
            const compare1 = await bcrypt.compare(Password,result.password)
        
            if (compare1)
            {
                const token = jwt.sign({Name:UserName,Role:result.roles},process.env.SECRET_KEY,{expiresIn:'1h'})
                console.log(token)
                res.cookie('userauthtoken',token,{httpOnly:true})
                res.status(200).json({ message: "Login Successful", role: result.roles })
            }
            else{
                res.status(401).send("Unauthorized access")
            }


        }
        else{
            res.status(400).send("Email not registered")
        }
    }

    catch
    {
        res.status(500).send("Internal Server error")
    }
})


//View profile 

// userauth.get('/profile',authenticate,async(req,res)=>
//     {
//             res.status(200).json({Email:req.Email,UserRole:req.Role}) 
//     })


userauth.get('/profile', authenticate, async(req, res) => {
    try {
        const username = req.Name

        const user = await users.findOne({ username: username })
        if (!user) {
             res.status(400).json({message:"User not found"})
        }

        res.json({
            fullname: user.name,
            email: user.email,
            UserRole:user.roles,
            username:user.username
        })
    } 
    
    catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})


userauth.put('/updateprofile', authenticate, async (req, res) => {

    try {
        const {FullName,Email,UserName } =req.body

        const user = await users.findOne({ fullname: req.name });
        if (!user) {
            return res.status(400).send("User not found");
        }

        user.name=FullName
        user.username=UserName

        await user.save()

        res.status(200).send("User profile updated successfully.")
       
    } 
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
    
});



//LOGOUT

userauth.get('/logout',(req,res)=>
{
    res.clearCookie('userauthtoken')
    res.status(200).send("Logged out...")
})

export {userauth}
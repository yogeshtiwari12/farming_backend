import User from '../model/models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const jwtkey = "12345678"


export const  signup = async(req,res)=>{
try {
    const {name,address,contact_number,password} = req.body;

    if (!name || !address || !contact_number || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user  = await User.findOne({contact_number})
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    
    const hashpassword = await bcryptjs.hash(password,10);

     const newUser = new User({
        name,
        address,
        contact_number,
        password:  hashpassword

     })
     await newUser.save()
     jwt.sign({newUser}, jwtkey, { expiresIn: "2d" }, (error, token) => {
        if(error){
            return res.status(500).json({message: "Error sending token"});
        }
        res.status(201).json({message:"User Signup successfully",
            name: newUser.name,
            address: newUser.address,
            contact_number: newUser.contact_number,
            token: token
        })
        
    })
} catch (error) {
    res.status(500).json({message:"Error creating user"})
}
} 


 export const login = async (req, res) => {
    try {
        const {name,password} = req.body;
        const user = await User.findOne({name});
        const  isMatch = await bcryptjs.compare(password, user.password)
         if(!user || !isMatch){
             return res.status(404).json({ message: 'User not found' })
         }

         jwt.sign({id:user._id}, jwtkey, { expiresIn: "2d" }, (error, token) => {
            if(error){
                return res.status(400).json({message: "Error sending token"});
            }
            res.cookie('token', token, {
                //localhost ka code
                secure: true, // Set to true since Render uses HTTPS
                sameSite: 'None', // Allows cross-site cookies with HTTPS
                // httpOnly: true,
                secure: true, // Render uses HTTPS
                sameSite: 'None',
            });
            res.status(200).json({ message: 'Logged in successfully'})
          
        })

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
      const token = req.cookies.token;
  
      if (!token) {
        return res.status(400).json({ message: "No token found" });
      }
  
     
      res.clearCookie('token', {
        // httpOnly: true,

        secure: true,
        sameSite: 'None',
        path: '/'

    });
      
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Error logging out", error: error.message });
    }
  };
  

  export const profile = async(req, res) => {
    try {
      const user = req.user;
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User profile fetched successfully", user });
    }
    catch(error){
        console.error("Profile error:", error);
        return res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
    
  }
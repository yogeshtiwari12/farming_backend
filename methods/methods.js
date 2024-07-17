import User from '../model/models.js';
import bcryptjs from 'bcryptjs';


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
     res.status(201).json({message:"User created successfully",newUser
        
     },)


    
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
         
         res.status(200).json({ message: 'Logged in successfully',
            user:{
                _id:user._id,
                name:user.name,
                contact_number:user.contact_number,
                address:user.address
                

            }
          })



    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }

}
// exports.getMovieByIndex = async(req, res) => {
//     let Movies = [
//         {
//             title: "Dilwale",
//             Hero: "Shahrukh Khan",
//             Heroin: "Kajul",
//             Industry: "Bollywood"
//         },
//         {
//             title: "Ek Tha Tiger",
//             Hero: "Salman Khan",
//             Heroin: "Kathrina Kaif",
//             Industry: "Bollywood"
//         },
//         {
//             title: "Imitation Game",
//             Hero: "Chris Hemsworth",
//             Heroin: "Alexandra Daddario",
//             Industry: "Hollywood"
//         }
//     ];

//     const index = parseInt(req.params.index); 

//     if (index >= 0 && index < Movies.length) {
//         res.send(Movies[index]);
//     } else {
//         res.status(404).send({ msg: "Movie not found" }); 
//     }
// };


// exports.getUserName = async(req,res) =>{
//     res.send({name:"User is Hasnain"})
// }

const user = require("../Models/userModel");   //connect with user table
const bcrypt = require('bcrypt');
exports.createNewUser = async (req, res) =>{
    try{
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;


        const {userName, email, password} = req.body;


        const existEmail = await user.findOne({email});
        
        if (!userName) {
            return res.status(404).json({warn:"Username is required"})
        }else if(!email){
            return res.status(404).json({warn:"Email is required"})
        }else if(!password){
            return res.status(404).json({warn:"Password is required"})
        } else if(!emailRegex.test(email)){
            return res.status(404).json({warn:"email is not corrected"})
        } else if(!passwordRegex.test(password)){
             return res.status(404).json({warn:"password should 6 elements and contains letters and alphabets"})
        }else if(existEmail){
           return res.status(404).json({warn:"email already existing"})
        }
        else{
            // bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newuser = await user.create({
                userName,
                email,
                password: hashedPassword
            });
        console.log("Save Date", newuser)
        return res.status(202).json({msg: "User Created Succefully", user:newuser})
        }
    } catch(error){
        console.log(error)
    }
}

exports.getAllUser = async (req, res) =>{
    try{
        const allusers = await user.find();


        if(!allusers){
            return res.status(404).json({warn:"User not found"})
        }



        res.status(200).json({msg: "Data found", users: allusers})
    } catch(error){
        console.log(error)
    }
}

// Delete

exports.deleteUser = async (req, res) =>{
    try{
        const User_Id = req.params.UserId;
        const delete_User = await user.findByIdAndDelete(User_Id);
        if(!delete_User){
            return res.status(404).json({wrn : "User not found"})
        } else{
            return res.status(202).json({msg: "User Deleted Succefully", deletedUser: delete_User})
        }

    }catch(error){
        console.log(error)
    }
}

//update user
exports.updateUser = async (req, res) =>{
    try{
        const User_Id = req.params.UserId;
        const update_User = await user.findByIdAndUpdate(User_Id,req.body,{new:true});
        if(!update_User){
            return res.status(404).json({wrn : "User not found"})
        } else{
            return res.status(202).json({msg: "User Updated Succefully", updatedUser: update_User})
        }

    }catch(error){
        console.log(error)
    }
}

// Authroute
const jwt = require('jsonwebtoken')

exports.authroute = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ wrn: "Email is required" });
        } 
         if (!password) {
            return res.status(400).json({ wrn: "Password is required" });
        }

        const find_User = await user.findOne({ email});

        if (!find_User) {
            return res.status(401).json({ wrn: "User not found" });
        }

        const find_Password = await bcrypt.compare(password, find_User.password);
        if (!find_Password) {
            return res.status(402).json({ wrn: "Password is incorrect" });
        }

        const Login_User_token = jwt.sign(
            {
                userId: find_User._id,
                userName: find_User.userName,
                email: find_User.email,
            },
            "abcdfghjk7123rv",
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            msg: "User login successful",
            LoginUser: find_User,
            User_Token: Login_User_token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Internal server error" });
    }
};

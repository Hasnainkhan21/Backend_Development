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


        const {username, email, Password} = req.body;


        const existEmail = await user.findOne({email});
        const existUsername = await user.findOne({username});
        const existPassword = await user.findOne({Password});
        
        if (!username) {
            return res.status(404).json({warn:"Username is required"})
        }else if(!email){
            return res.status(404).json({warn:"Email is required"})
        }else if(!Password){
            return res.status(404).json({warn:"Password is required"})
        } else if(!emailRegex.test(email)){
            return res.status(404).json({warn:"email is not corrected"})
        } else if(!passwordRegex.test(Password)){
             return res.status(404).json({warn:"password should 6 elements and contains letters and alphabets"})
        }else if(existEmail){
           return res.status(404).json({warn:"email already existing"})
        }else if(existUsername){
                return res.status(404).json({warn:"Username already existing"})
        }else if(existPassword){
            return res.status(404).json({warn:"Password already existing"})
        }
        else{
            
            const hashedPassword = await bcrypt.hash(Password, 10);
            
            const newuser = await user.create({
                username,
                email,
                Password: hashedPassword
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
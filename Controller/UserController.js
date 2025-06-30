const user = require("../Models/userModel");   //connect with user table
const bcrypt = require('bcrypt');

exports.createNewUser = async (req, res) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    const { userName, email, password } = req.body;

    const existEmail = await user.findOne({ email });

    if (!userName) {
      return res.status(400).json({ warn: "Username is required" });
    } else if (!email) {
      return res.status(400).json({ warn: "Email is required" });
    } else if (!password) {
      return res.status(400).json({ warn: "Password is required" });
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({ warn: "Invalid email format" });
    } else if (!passwordRegex.test(password)) {
      return res.status(400).json({
        warn: "Password must be at least 6 characters and contain letters and numbers",
      });
    } else if (existEmail) {
      return res.status(409).json({ warn: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      userName,
      email,
      password: hashedPassword,
    });

    console.log("Saved User:", newUser);
    return res.status(201).json({ msg: "User Created Successfully", user: newUser });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


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
const jwt = require('jsonwebtoken');// Adjust path if needed

exports.authroute = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ wrn: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ wrn: "Password is required" });
    }

    const find_User = await user.findOne({ email });
    if (!find_User) {
      return res.status(401).json({ wrn: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, find_User.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ wrn: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        userId: find_User._id,
        userName: find_User.userName,
        email: find_User.email,
      },
      process.env.JWT_SECRET || "abcdfghjk7123rv", // Use .env for production
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      msg: "User login successful",
      LoginUser: find_User,
      User_Token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ err: "Internal server error" });
  }
};


const jwt = require('jsonwebtoken');

exports.authmiddlevare = async (req, res, next) =>{
    try {
            const varifiedToken = req.headers.token;
            console.log(varifiedToken)
            if(!varifiedToken){
                return res.status(404).json({wrn:"Invalid Token"})
            }

            const IsvarifiedUser = await jwt.verify(varifiedToken, "abcdfghjk7123rv")
            if(!IsvarifiedUser){
                return res.json.status(404).json({wrn: "User not authorized..!"})
            }
            req.user = IsvarifiedUser
//here we can give access to admin(isadmin)
            next()
    } catch (error) {
        console.log(error)
    }
}
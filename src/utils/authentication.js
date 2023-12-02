import  jwt  from "jsonwebtoken"

async function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        Name:user.Name
    }   

    return jwt.sign(
        payload,
        process.env.TOKEN_SALT,
        {
            expiresIn:process.env.TOKEN_EXPIRY
        }
    )
}



export {createTokenForUser}


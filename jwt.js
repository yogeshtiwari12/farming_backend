import jwt from 'jsonwebtoken'
const jwtkey = "12345678"



const verifytoken = (req, res, next) => {
    const token  = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'You are not authenticated' })
    }

    jwt.verify(token,jwtkey,(error,decoded) => {
        if(error) {
            return res.status(401).json({ message: 'Failed to authenticate token' })
        }

        req.userId = decoded.id
        next()
    })

}

export default verifytoken
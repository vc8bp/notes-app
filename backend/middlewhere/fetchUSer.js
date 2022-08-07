var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Vivekisagoodb$oy';

const fetchUser = (req, res, next) => {

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please authenticate with valid user"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
        
    } catch (error) {
        res.status(401).send({error: "please authenticate with valid user"});
    }
    
}



module.exports = fetchUser;
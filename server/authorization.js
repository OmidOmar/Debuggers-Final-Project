import jwt from "jsonwebtoken";

//Authorization Middleware
const authorization = (req, res, next) => {
    //get token
    req.body.isAdmin = true;

	const token = req.headers.authorization;
    req.body.testMsg = "Hello from Authorization";
	try {
        //if token exist
		if (token) {
            //verify token
			const { username, isAdmin } = jwt.verify(
				token.split(" ")[1],process.env.JWT_SECRET
			);
			req.body.isAdmin = isAdmin;
            req.body.username=username;
		} else {
            req.body.authMsg = "Invalid Token";
        }
	} catch (err) {
        //return error if token or secret key is invalid
		req.body.authMsg = "Invalid signature";
	}
	next();
};

module.exports = authorization;
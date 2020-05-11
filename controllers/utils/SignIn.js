class SignIn {
    constructor(req){
        const {body: { password, email }} = req;
        req.res.send({status: true});
    }
}

module.exports = SignIn;
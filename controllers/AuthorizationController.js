const SignIn = require("./utils/SignIn");

class AuthorizationController{
    constructor(){

    }

    signIn(req){
        return new SignIn(req);
    }
}

module.exports = new AuthorizationController();
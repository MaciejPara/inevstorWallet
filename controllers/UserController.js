const model = require("../models/User");
const Controller = require("./Controller");

class UserController extends Controller{
    constructor(props){
        super(props);
    }

    async setUser(req, res){
        try {
            const { body: { email, password, role } } = req;

            const exists = await this.getOne({where: {email}});

            if(exists) throw new Error("Email already exists !!!");
            if(!email || !password) throw new Error("Email and password are required !!!");

            const user = {
                email,
                password,
                role
            };

            const newUser = await this.create({data: user});

            res.send(newUser);
        }catch (e) {
            this.handleError(e, {res});
        }
    }
}

module.exports = new UserController({ model });
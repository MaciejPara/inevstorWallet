const UserModel = require("../models/User");

const getUsers = async(req, res) => {
    try {
        const where = req.query.filter && JSON.parse(req.query.filter);

        const users = await UserModel.find(where, "_id email role");

        res.send(users);
    }catch (e) {
        res.status(500).send(e);
    }
};

const setUser = async(req, res) => {
    try {
        const { body: { email, password, role } } = req;

        const exists = await UserModel.findOne({email});

        if(exists) throw new Error("Email already exists !!!");
        if(!email || !password) throw new Error("Email and password are required !!!");

        const user = {
            email,
            password,
            role
        };

        const newUser = new UserModel(user);

        await newUser.save();

        res.send(newUser);
    }catch (e) {
        res.status(403).send({error: e.toString()});
    }
};

module.exports = { getUsers, setUser };
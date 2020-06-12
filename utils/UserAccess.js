const sendMail = require("@sendgrid/mail");
const User = require("../models/User");

const { SENDGRID_KEY, ADMIN_EMAIL, PROTOCOL, DOMAIN, PORT, NODE_ENV } = process.env;
const CONFIRMATION_LINK = `${PROTOCOL}://${DOMAIN}${NODE_ENV === "development" ? `:${PORT}` : ""}/confirm`;

sendMail.setApiKey(SENDGRID_KEY);

class UserAccess {

    static async signup(req, res){
        try {
            const { body: { email, password } } = req;

            const existingUser = await User.findOne({email: email});

            if(!UserAccess._validateEmail(email)) return res.status(403).send({error: "Email is not valid."});
            if((password && password.length < 8) || !password) return res.status(403).send({error: "Password must be at least 8 characters long."});

            if(!existingUser){
                const newUser = User();

                newUser.email = email;
                newUser.password = password;
                newUser.role = "user";

                const msg = {
                    to: email,
                    from: ADMIN_EMAIL,
                    subject: "Investor Wallet - registration",
                    text: " - ",
                    html: `<a href="${CONFIRMATION_LINK}?email=${email}">Click the link to confirm your account</a>`,
                };

                await newUser.save();

                res.status(200).send({message: "Registration success, check your email."});

                try {
                    await sendMail.send(msg);
                } catch (error) {
                    throw error;
                }

            }else{
                return res.status(409).send({error: "Email already exists"});
            }
        }catch (e) {
            throw new Error(e);
        }
    }

    static async confirmSignup(req, res){
        try {
            const { query: { email } } = req;

            const existingUser = await User.findOne({email: email});

            if(existingUser){
                if(existingUser.confirmed) return res.status(200).send({message: "Your account is already confirmed"});

                existingUser.confirmed = true;
                existingUser.save();

                return res.status(200).send({message: "Confirmation success"});
            }else{
                return res.status(403).send({message: "Provided email wasn't registered. Please signup"});
            }
        }catch (e) {
            throw new Error(e);
        }
    }

    static signin(req, res){
        const {email, role, confirmed, createdAt, updatedAt} = req.user;

        res.send({role, email, confirmed, createdAt, updatedAt});
    }

    static signout(req, res){
        req.session.destroy();
        res.send({status: 200});
    }

    static checkIfUserIsAuthenticated(req, res, next){
        if(req.isAuthenticated()) next();
        else next("Unauthorized");
    }

    static _validateEmail(email){
        const test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return test.test(String(email).toLowerCase());
    }
}

module.exports = UserAccess;
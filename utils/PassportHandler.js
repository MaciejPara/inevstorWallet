const LocalStrategy = require("passport-local");
const passport = require("passport");
const expressSession = require("express-session");
const MongoStore = require("connect-mongodb-session")(expressSession);
const User = require("../models/User");
const sendMail = require("@sendgrid/mail");

const { SENDGRID_KEY, ADMIN_EMAIL, PROTOCOL, DOMAIN, PORT } = process.env;

sendMail.setApiKey(SENDGRID_KEY);

const CONFIRMATION_LINK = `${PROTOCOL}://${DOMAIN}:${PORT}/confirm`;

const validateEmail = email => {
    const test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return test.test(String(email).toLowerCase());
};

class PassportHandler {
    static serializeUser(user, done) {
        done(null, user.id);
    }

    static deserializeUser(userId, done) {
        User.findById(userId, function (err, user) {
            done(err, user);
        });
    }

    static localStrategy(){
        return new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            function(email, password, done) {
                User.findOne({ email }, function (err, user) {
                    if (err) return done(err);
                    if (!user) return done(null, false);

                    user.comparePassword(password, done);
                });
            }
        );
    }

    static checkIfUserIsAuthenticated(req, res, next){
        if(req.isAuthenticated()) next();
        else next("Unauthorized");
    }

    static authenticate(){
        return passport.authenticate("local");
    }

    static expressSession(){
        return expressSession({
            secret: "This is a secret",
            store: new MongoStore({
                uri: "mongodb://localhost:27017/investorWallet",
                collection : "sessions"
            }),
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
            },
            resave: false,
            saveUninitialized: false,
        });
    }

    static initialize(){
        return passport.initialize();
    }

    static session(){
        return passport.session();
    }

    static async signup(req, res){
        try {
            const { body: { email, password } } = req;

            const existingUser = await User.findOne({email: email});

            if(!validateEmail(email)) return res.status(403).send({error: "Email is not valid."});
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
                    html: `<a href="${CONFIRMATION_LINK}?email=${email}">Click then link to confirm your account</a>`,
                };

                await newUser.save();

                res.status(200).send({message: "Registration success, check your email."});

                try {
                    await sendMail.send(msg);
                } catch (error) {
                    throw error;
                }

            }else{
                return res.status(409).send({error: "Email already registered"});
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
}

module.exports = PassportHandler;
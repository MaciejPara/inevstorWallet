const LocalStrategy = require("passport-local");
const passport = require("passport");
const expressSession = require("express-session");
const MongoStore = require("connect-mongodb-session")(expressSession);
const User = require("../models/User");
const UserAccess = require("./UserAccess");

class PassportHandler extends UserAccess{

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
                    if(err) return done(err);
                    if(!user) return done(null, false);
                    if(!user.confirmed) return done(null, false);

                    user.comparePassword(password, done);
                });
            }
        );
    }

    static authenticate(){
        return passport.authenticate("local");
    }

    static expressSession(){
        const {
            MONGO_CONNECTION_LINK,
            SECURE_COOKIE,
            SAME_SITE
        } = process.env;

        const cookie = {
            secure: SECURE_COOKIE,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            sameSite: SAME_SITE,
        };

        if(SECURE_COOKIE !== "true"){
            delete cookie.secure;
            delete cookie.sameSite;
        }

        return expressSession({
            secret: "secret",
            store: new MongoStore({
                uri: MONGO_CONNECTION_LINK,
                collection : "sessions"
            }),
            cookie,
            resave: false,
            saveUninitialized: true,
        });
    }

    static initialize(){
        return passport.initialize();
    }

    static session(){
        return passport.session();
    }
}

module.exports = PassportHandler;
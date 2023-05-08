const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserbyName, getUserbyId){
    const authenticateUser = async (username, password, done) => {
        const ERROR_MESSAGE = "The credentials are incorrect."
        const user = await getUserbyName(username);
        if(user == null){
            return done(null, false, {message: ERROR_MESSAGE});
        }
        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            else{
                return done(null, false, {message: ERROR_MESSAGE})
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.userId))
    passport.deserializeUser(async (userId, done) => {
        const id = await getUserbyId(userId);
        return done(null, id);
    })
}

module.exports = initialize
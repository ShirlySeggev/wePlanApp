const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { txt, password } = req.body
    try {
        const user = await authService.login(txt, password)
        console.log('user in auth con is:', user);
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    const { userCred, isGoogle } = req.body
    // console.log('got user in signup in auth.controller:', userCred);
    // console.log('isGoogle', isGoogle);
    try {
        const { fullname, username, email, imgUrl, password } = userCred
        // CHECK IF GOOGLE USER IS APP USER
        if (isGoogle) {
            var googleUser = await authService.login( username, password )
            req.session.loggedinUser = googleUser //saved in an orange balloon (cookie session
            // console.log('loggedin with google in auth contorller:', googleUser);
            if (googleUser) {
                delete googleUser.password
                res.send(googleUser)
            }
        }

        if (!isGoogle || !googleUser) {
            // console.log('Signing up in auth contorller!');
            const account = await authService.signup(username, password, fullname, email, imgUrl)  
            // if we found a user:
            console.log('account is:', req.body);
            logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
            const user = await authService.login(email, password)
            req.session.loggedinUser = user //saved in an orange balloon (cookie session
            delete user.password
            res.json(user)
        }
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}


async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}
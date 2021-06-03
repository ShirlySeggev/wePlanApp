const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(txt, password) {
    logger.debug(`auth.service - login with username/email: ${txt}`)
    const userByUser = await userService.getByUsername(txt)
    const userByEmail = await userService.getByUserEmail(txt)
    console.log('userByEmail', userByEmail);
    let match
    if (userByEmail){
        match = await bcrypt.compare(password, userByEmail.password)
        if (!match) return Promise.reject('Invalid username/email or password')
        delete userByEmail.password
        return userByEmail
    } 
    if (userByUser){
        match = await bcrypt.compare(password, userByUser.password)
        if (!match) return Promise.reject('Invalid username/email or password')
        delete userByUser.password
        return userByUser
    } 
    else return Promise.reject('Invalid username/email or password')
}



async function signup(username, password, fullname, email, imgUrl) {
    const saltRounds = 10
    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname},email: ${email}, imgUrl: ${imgUrl}`)
    if (!username || !password || !fullname || !email) return Promise.reject('please fill all slots')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname, email, imgUrl })
}

module.exports = {
    signup,
    login,
}
import { httpService } from './http.service'
const SCORE_FOR_REVIEW = 10

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    increaseScore
}
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/user' : 'http://localhost:3030/api/user';


function getUsers() {
    return httpService.get(`user`)
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

async function increaseScore(by = SCORE_FOR_REVIEW) {
    const user = getLoggedinUser()
    user.score = user.score + by || by
    await update(user)
    return user.score
}

async function login(userCred) {
    try{
        const user = await httpService.post('auth/login', userCred)
        if (user) return _saveLocalUser(user)
    }catch(err){
        console.log(err)
        throw err
    }
}

async function logout() {
    return await httpService.post('auth/logout')
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    if (user) return _saveLocalUser(user)
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}


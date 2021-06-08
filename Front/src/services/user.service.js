import { httpService } from './http.service'


const STORAGE_KEY = 'boardUsers'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser: _getLoggedinUser,
    // increaseScore
}
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/user' : 'http://localhost:3030/api/user';


function getUsers() {
    return httpService.get(`user`)
    // return asyncUserStorage.query(STORAGE_KEY)
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
    // return asyncUserStorage.get(STORAGE_KEY, userId);

}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    if (_getLoggedinUser()._id === user._id) _saveLocalUser(user)
}



// AUTH
async function login(userCred) {
    // const user = await asyncUserStorage.get(STORAGE_KEY, userCred)
    const user = await httpService.post('auth/login', userCred)
    try {
        if (user) return _saveLocalUser(user)
    } catch (err) {
        console.log('error in user service, problem in login', err)
        throw err
    }
}

async function signup(userCred, isGoogle) {
    // const user = await asyncUserStorage.post(STORAGE_KEY, userCred)
    const user = await httpService.post('auth/signup',{ userCred, isGoogle})
    try {
        if (user) return _saveLocalUser(user)
        
    } catch (err) {
        console.log('error in user service signup', err)
    }
}

async function logout() {
    _clearLocalUser();
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function _getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

function _clearLocalUser() {
    sessionStorage.clear();
}





export const asyncUserStorage = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || require('../data/user.json');
    _save(entityType, entities);
    return Promise.resolve(entities)
}

async function get(entityType, entity) {
    try {
        const entities = await query(entityType)
        const userName = entities.find(user => user.username === entity.txt)
        const userEmail = entities.find(user => user.email === entity.txt)
        if (userName.password === entity.password) return Promise.resolve(userName)
        if (userEmail.password === entity.password) return Promise.resolve(userEmail)
        else return null
    } catch (err) {
        console.log('got error in get: ', err);
    }
}

async function post(entityType, newEntity) {
    newEntity._id = _makeId();
    try {
        const entities = await query(entityType)
        entities.push(newEntity);
        _save(entityType, entities);
        return newEntity;
    } catch (err) {
        console.log('got error in post: ', err);
    }
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity);
            _save(entityType, entities);
            return updatedEntity;
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId);
            entities.splice(idx, 1);
            _save(entityType, entities);
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

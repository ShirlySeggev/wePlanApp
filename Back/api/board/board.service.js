const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByName,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('board')
        var boards = await collection.find().toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards service', err)
        throw err
    }
}

async function add(board) {
    //console.log('on add', board);
    try {
        const boardToAdd = { ...board }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(boardToAdd)
        return boardToAdd
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function getByName(boardName) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ boardName })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardName}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = {
            ...board,
            _id: ObjectId(board._id)
        }
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ '_id': boardToSave._id }, { $set: boardToSave })
        return boardToSave;
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

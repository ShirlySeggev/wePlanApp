const boardService = require('./board.service')
const logger = require('../../services/logger.service')

module.exports = {
    getBoards,
    getBoard,
    addBoard,
    updateBoard,
    deleteBoard
}

async function getBoards(req, res) {
    try {
        // const filterBy={} todo
        const boards = await boardService.query()
        res.send(boards)
    } catch (err) {
        logger.error('Failed to get boards controller', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function getBoard(req, res) {
    try {
        const board = await boardService.getById(req.params.boardId)
        res.send(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

async function addBoard(req, res) {
    try {
        const board = req.body
        const savedBoard = await boardService.add(board)
        res.send(savedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

async function updateBoard(req, res) {
    try {
        const { board, activity } = req.body
        // console.log('activity', activity);
        // console.log('board groups', board.groups);
        const savedBoard = await boardService.update(board, activity)
        // console.log('savedBoard', savedBoard);
        res.send(savedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

async function deleteBoard(req, res) {
    console.log('here');
    console.log(req.params.boardId);
    try {
        await boardService.remove(req.params.boardId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}
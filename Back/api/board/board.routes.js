const express = require('express')
const { getBoards, addBoard, deleteBoard, getBoard, updateBoard } = require('./board.controller')


const router = express.Router()

router.get('/', getBoards)
router.get('/:boardId', getBoard)
router.put('/:boardId', updateBoard)
router.delete('/:boardId', deleteBoard)
router.post('/', addBoard)

// router.put('/', updateBoard)
module.exports = router
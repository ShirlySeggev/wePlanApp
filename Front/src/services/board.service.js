// import axios from 'axios';
import { httpService } from './http.service'
import { asyncBoardService } from './async-board.service.js';
import { utilService } from './util.service';

const STORAGE_KEY = 'boards';
const BASE_URL = 'board'

export const boardService = {
    query,
    getById,
    update,
    remove,
    save
}


async function query() {
    // return asyncBoardService.query(STORAGE_KEY)
    const boards = await httpService.get(BASE_URL)
    return boards;
}

async function getById(boardId) {
    // return asyncBoardService.get(STORAGE_KEY, boardId);
    return await httpService.get(BASE_URL + '/' + boardId)
}

async function remove(boardId) {
    // return asyncBoardService.remove(STORAGE_KEY, boardId);
    await httpService.delete(BASE_URL + '/' + boardId)
}

async function update(board, activity) {
    // return asyncBoardService.put(STORAGE_KEY, board)
    await httpService.put(BASE_URL + '/' + board._id, { board, activity })
}

async function save(board) {
    // board._id = utilService.makeId()
    // board.createdAt = Date.now()
    // return asyncBoardService.post(STORAGE_KEY, board)
    const savedBoard = await httpService.post(BASE_URL, board)
    return savedBoard
}


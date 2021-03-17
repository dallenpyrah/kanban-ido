import { AppState } from '../AppState'

import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    try {
      const res = await api.get('api/boards')
      AppState.boards = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getBoardsById(id) {
    try {
      const res = await api.get('api/boards/' + id)
      AppState.activeBoard = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getListsByBoardId(id) {
    try {
      const res = await api.get(`api/boards/${id}/lists`)
      AppState.lists = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBoard(body) {
    try {
      const res = await api.post('api/boards', body)
      AppState.boards.push(res.data)
      return res.data.id
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBoard(id) {
    try {
      await api.delete('api/boards/' + id)
      this.getAllBoards()
    } catch (error) {
      console.error(error)
    }
  }

  async editBoard(id, body) {
    try {
      const res = await api.put('api/boards/' + id, body)
      console.log(res)
      AppState.activeBoard = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const boardsService = new BoardsService()

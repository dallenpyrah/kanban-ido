import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async edit(id, userId, body) {
    return await dbContext.Board.findOneAndUpdate(id, userId, body).populate('creatorId')
  }

  async delete(id) {
    return await dbContext.Board.findByIdAndDelete(id).populate('creatorId')
  }

  async create(body) {
    return await dbContext.Board.create(body)
  }

  async find(query = {}) {
    const board = await dbContext.Board.find(query).populate('creatorId')
    return board
  }

  async findById(id) {
    const board = await dbContext.Board.findById(id).populate('creatorId')
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return board
  }
}

export const boardsService = new BoardsService()

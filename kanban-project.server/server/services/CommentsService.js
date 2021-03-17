import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async edit(id, userId, body) {
    return await dbContext.Comment.findOneAndUpdate(id, userId, body).populate('creatorId')
  }

  async delete(id) {
    return await dbContext.Comment.findByIdAndDelete(id).populate('creatorId')
  }

  async create(body) {
    return await dbContext.Comment.create(body)
  }

  async find(query = {}) {
    const comment = await dbContext.Comment.find(query).populate('creatorId')
    return comment
  }

  async findById(id) {
    const comment = await dbContext.Comment.findById(id).populate('creatorId')
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }
}

export const commentsService = new CommentsService()

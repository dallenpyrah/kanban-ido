import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async edit(id, creatorId, body) {
    debugger
    return await dbContext.Task.findOneAndUpdate({ id, creatorId }, body).populate('creatorId')
  }

  async delete(id) {
    return await dbContext.Task.findByIdAndDelete(id).populate('creatorId')
  }

  async create(body) {
    return await dbContext.Task.create(body)
  }

  async find(query = {}) {
    const task = await dbContext.Task.find(query).populate('creatorId')
    return task
  }

  async findById(id) {
    const task = await dbContext.Task.findById(id).populate('creatorId')
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }
}

export const tasksService = new TasksService()

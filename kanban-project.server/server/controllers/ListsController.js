import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getListsById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('/:id/tasks', this.getTasksByListId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
  }

  async getTasksByListId(req, res, next) {
    try {
      res.send(await tasksService.find({ list: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async getListsById(req, res, next) {
    try {
      return res.send(await listsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      return res.send(await listsService.find())
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await listsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await listsService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await listsService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}

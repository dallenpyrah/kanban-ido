import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getBoardsById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('/:id/lists', this.getListsByBoardId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
  }

  async getListsByBoardId(req, res, next) {
    try {
      res.send(await listsService.find({ board: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async getBoardsById(req, res, next) {
    try {
      return res.send(await boardsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      return res.send(await boardsService.find())
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await boardsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await boardsService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await boardsService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}

import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getBoardsById)
      .get('/:id/lists', this.getListsByBoardId)
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
      return res.send(await boardsService.find({ creatorId: req.userInfo.id }))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const board = await boardsService.create(req.body)
      res.send(await boardsService.findById(board._id))
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

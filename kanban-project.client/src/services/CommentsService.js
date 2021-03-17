import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  async getAllComments() {
    try {
      const res = await api.get('api/comments')
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getCommentById(id) {
    try {
      const res = await api.get('api/comments/' + id)
      AppState.activeComment = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createComment(body) {
    try {
      return await api.post('api/comments', body)
    } catch (error) {
      console.error(error)
    }
  }

  async editComment(id, body) {
    try {
      const res = await api.put('api/comments/' + id, body)
      AppState.activeComment = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(id) {
    try {
      return await api.delete('api/comments/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}

export const commentsService = new CommentsService()

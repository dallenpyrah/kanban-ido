import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getAllTasks() {
    try {
      const res = await api.get('api/tasks')
      AppState.tasks = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getTaskById(id) {
    try {
      const res = await api.get('api/tasks/' + id)
      AppState.activeTask = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getCommentsByTaskId(id) {
    try {
      const res = await api.get(`api/tasks/${id}/comments`)
      AppState.comments[id] = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createTask(body) {
    try {
      return await api.post('api/tasks/', body)
      // AppState.tasks = res.data
      // return res.data.id
    } catch (error) {
      console.error(error)
    }
  }

  async editTask(id, body) {
    try {
      const res = await api.put('api/tasks/' + id, body)
      AppState.activeTask = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteTask(id) {
    try {
      return await api.delete('api/tasks/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}

export const tasksService = new TasksService()

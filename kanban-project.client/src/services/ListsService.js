import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getAllLists() {
    try {
      const res = await api.get('api/lists')
      AppState.lists = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getListById(id) {
    try {
      const res = await api.get('api/lists/' + id)
      AppState.activeList = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getTasksByListId(id) {
    try {
      const res = await api.get(`api/lists/${id}/tasks`)
      AppState.tasks[id] = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createList(body) {
    try {
      const res = await api.post('api/lists', body)
      AppState.lists.push(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async editList(id, body) {
    try {
      const res = await api.put('api/lists/' + id, body)
      console.log(res)
      AppState.activeList = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteList(id) {
    try {
      return await api.delete('api/lists/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}

export const listsService = new ListsService()

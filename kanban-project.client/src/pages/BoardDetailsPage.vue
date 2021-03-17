<template>
  <div class="col-12 text-center">
    <form @submit.prevent="createList" class="form-group">
      <input type="text" placeholder="Create List" v-model="state.newList.list">
      <button type="sumbit" class="btn btn-success">
        Create
      </button>
    </form>
    <div class="card">
      <h1>{{ state.board.title }}</h1>
    </div>
    <div class="row">
      <List v-for="list in state.list" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { boardsService } from '../services/BoardsService'
import { useRoute } from 'vue-router'
import List from '../components/List'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
export default {
  name: 'BoardDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      board: computed(() => AppState.activeBoard),
      list: computed(() => AppState.lists),
      newList: {}
    })
    onMounted(async() => await boardsService.getBoardsById(route.params.id))
    onMounted(async() => await boardsService.getListsByBoardId(route.params.id))
    return {
      route,
      state,
      async createList() {
        try {
          const list = { list: state.newList.list, board: state.board.id }
          await listsService.createList(list)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {
    List
  }
}
</script>

<style>

</style>

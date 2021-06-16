<template>
  <div class="container-fluid">
    <div class="col-12 text-center mt-3">
      <CreateListModal />
      <div class="card">
        <h1>
          <button
            type="sumbit"
            class="btn btn-dark m-3"
            :data-target="`#create-list` + state.board._id"
            data-toggle="modal"
            aria-hidden="true"
          >
            Create List
          </button>
          {{ state.board.title }}
        </h1>
      </div>
      <div class="row no-wrap">
        <List v-for="list in state.list" :key="list.id" :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { boardsService } from '../services/BoardsService'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
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
    onBeforeRouteLeave((to, from, next) => {
      AppState.activeBoard = {}
      AppState.lists = {}
      AppState.tasks = {}
      AppState.comments = {}
      next()
    })
    onMounted(async () => await boardsService.getBoardsById(route.params.id))
    onMounted(async () => await boardsService.getListsByBoardId(route.params.id))
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
.no-wrap {
  height: 78vh;
}
</style>

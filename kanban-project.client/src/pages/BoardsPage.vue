<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <button type="sumbit" class="btn m-2 p-2" :data-target="`#create-board` + state.board._id" data-toggle="modal" aria-hidden="true">
          <i class="fa fa-plus-square fa-2x text-dark" aria-hidden="true"> Create Board</i>
        </button>
        <CreateBoardModal />
      </div>
      <Board v-for="board in state.board" :key="board.id" :board="board" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Board from '../components/Board'
import { boardsService } from '../services/BoardsService'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
export default {
  name: 'BoardsPage',

  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      board: computed(() => AppState.boards),
      newBoard: {}
    })
    onBeforeRouteLeave((to, from, next) => {
      AppState.boards = []
      AppState.lists = {}
      AppState.tasks = {}
      AppState.comments = {}
      next()
    })
    onMounted(() => { boardsService.getAllBoards() })
    return {
      state,
      async createBoard() {
        try {
          const boardId = await boardsService.createBoard(state.newBoard)
          console.log(state.newBoard)
          router.push({ name: 'BoardDetailsPage', params: { id: boardId } })
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {
    Board
  }
}

</script>

<style>

</style>

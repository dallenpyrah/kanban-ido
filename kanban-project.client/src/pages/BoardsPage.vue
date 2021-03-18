<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <form @submit.prevent="createBoard" class="form-group">
          <input type="text" placeholder="Board Title" v-model="state.newBoard.title">
          <input type="text" placeholder="Description" v-model="state.newBoard.description">
          <button type="sumbit" class="btn btn-success">
            Create
          </button>
        </form>
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
import { useRouter } from 'vue-router'
export default {
  name: 'BoardsPage',

  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      board: computed(() => AppState.boards),
      newBoard: {}
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

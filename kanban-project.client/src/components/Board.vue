<template>
  <!-- <form @submit.prevent="createBoard" class="form-group">
    <input type="text" placeholder="Board Title" v-model="state.newBoard.title">
    <input type="text" placeholder="Description" v-model="state.newBoard.description">
    <button type="sumbit" class="btn btn-success">
      Create
    </button>
  </form> -->
  <div class="col-4 text-center m-4">
    <div class="card p-3 rounded bg-dark">
      <div class="card-title">
        <h1 class="text-light mt-2">
          <i v-if="state.user.email == board.creatorId.email" class="fa fa-trash text-danger m-3" @click="deleteBoard" aria-hidden="true"></i>
          <router-link :to="{name:'BoardDetailsPage', params: {id: board.id}}">
            <span class="text-light"> {{ board.title }} </span>
          </router-link>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'Board',
  props: {
    board: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      board: computed(() => AppState.boards),
      list: computed(() => AppState.lists),
      activeBoard: computed(() => AppState.activeBoard),
      newBoard: {}
    })
    return {
      route,
      state,
      async createBoard() {
        try {
          await boardsService.createBoard(state.newBoard)
        } catch (error) {
          console.log(error)
        }
      },
      async deleteBoard() {
        await boardsService.deleteBoard(props.board.id)
      }
    }
  },
  components: {
  }
}
</script>

<style>
.rounded{
  border-radius: 50rem!important;
}
</style>

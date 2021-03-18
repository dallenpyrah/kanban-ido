<template>
  <div class="create-board-modal">
    <div
      class="modal fade"
      :id="`create-board` + state.board._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">
              Add your board
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createBoard">
              <div class="form-group">
                <input
                  type="text"
                  name="board"
                  id="board"
                  class="form-control"
                  placeholder="Enter Board"
                  aria-describedby="helpId"
                  v-model="state.newBoard.title"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn" @click="createBoard">
              <i class="fa fa-plus-square fa-2x text-success" aria-hidden="true"> Create</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import $ from 'jquery'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'CreateBoardModal',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      board: computed(() => AppState.boards),
      newBoard: {}
    })
    return {
      state,
      async createBoard() {
        try {
          await boardsService.createBoard(state.newBoard)
          state.newBoard = { title: '' }
          $('#create-board' + state.board._id).modal('hide')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

}
</script>

<style>

</style>

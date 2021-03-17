<template>
  <div class="create-list-modal">
    <div
      class="modal fade"
      :id="`create-list` + state.board._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create Your List
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
            <form class="form-inline" @submit.prevent="createList">
              <div class="form-group">
                <input
                  type="text"
                  name="task"
                  id="task"
                  class="form-control"
                  placeholder="Enter List"
                  aria-describedby="helpId"
                  v-model="state.newList.list"
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
            <button class="btn btn-success" @click="createList">
              Create
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
import { listsService } from '../services/ListsService'
export default {
  name: 'CreateListModal',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      activeList: computed(() => AppState.activeList),
      board: computed(() => AppState.activeBoard),
      newList: {}
    })
    return {
      state,
      async createList() {
        try {
          const list = { list: state.newList.list, board: state.board.id }
          await listsService.createList(list)
          $('#create-list' + state.board._id).modal('hide')
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

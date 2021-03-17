<template>
  <div class="create-task-modal">
    <div
      class="modal fade"
      :id="`create-task` + listData._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create Your Task
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
            <form class="form-inline" @submit.prevent="createTask">
              <div class="form-group">
                <input
                  type="text"
                  name="task"
                  id="task"
                  class="form-control"
                  placeholder="Enter Task"
                  aria-describedby="helpId"
                  v-model="state.newTask.task"
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
            <button class="btn btn-success" @click="createTask">
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
import { tasksService } from '../services/TasksService'
import $ from 'jquery'
import { listsService } from '../services/ListsService'
export default {
  name: 'CreateTaskModal',
  props: {
    listData: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      activeList: computed(() => AppState.activeList),
      newTask: { task: '', list: props.listData.id }
    })
    return {
      state,
      async createTask() {
        try {
          await tasksService.createTask(state.newTask)
          await listsService.getTasksByListId(props.listData.id)
          state.newTask = { task: '', list: props.listData.id }
          $('#create-task' + props.listData._id).modal('hide')
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

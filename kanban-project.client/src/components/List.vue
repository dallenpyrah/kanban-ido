<template>
  <div
    v-if="state.user.isAuthenticated"
    class="col-2 mt-4 mb-2"
    dropzone="zone"
    @dragover.prevent
    @drop.prevent="moveTask"
  >
    <div class="card">
      <h3>
        <div>
          <i
            v-if="state.user.email == list.creatorId.email"
            class="fa fa-times text-danger"
            @click="deleteList"
            aria-hidden="true"
          ></i>
          {{ list.list }}
        </div>
      </h3>
    </div>
    <div class="card bg-dark text-light">
      <Task
        v-for="task in state.task"
        :key="task.id"
        :task="task"
        :list="list"
      />
      <button
        class="btn"
        :data-target="`#create-task` + list._id"
        data-toggle="modal"
        aria-hidden="true"
      >
        <i class="fa fa-plus-square fa-lg text-light" aria-hidden="true"> </i>
      </button>
    </div>
  </div>
  <CreateTaskModal :list-data="list" />
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
import Task from '../components/Task'
import { boardsService } from '../services/BoardsService'
import { tasksService } from '../services/TasksService'
export default {
  name: 'List',
  props: {
    list: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      list: computed(() => AppState.lists),
      task: computed(() => AppState.tasks[props.list.id])
    })
    onMounted(async () => await listsService.getTasksByListId(props.list.id))
    function moveTask() {
      const task = JSON.parse(event.dataTransfer.getData('task'))
      const oldListId = JSON.parse(event.dataTransfer.getData('oldList'))
      const newList = props.list.id
      console.log('items dropped here', task, props.list.list)
      tasksService.moveTask2(oldListId, newList, task)
    }
    return {
      state,
      moveTask,
      async deleteList() {
        try {
          await listsService.deleteList(props.list.id)
          boardsService.getListsByBoardId(props.list.board)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {
    Task
  }
}
</script>

<style>
</style>

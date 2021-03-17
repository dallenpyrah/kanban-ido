<template>
  <div v-if="state.user.isAuthenticated" class="col-2 mt-4">
    <div class="card bg-dark text-light">
      <h3><span class="text-danger" @click="deleteList"> &#9747; </span>List: {{ list.list }} <i class="fa fa-plus-square text-success" :data-target="`#create-task` + list._id" data-toggle="modal" aria-hidden="true"></i></h3>
      <Task v-for="task in state.task" :key="task.id" :task="task" />
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
    onMounted(async() => await listsService.getTasksByListId(props.list.id))
    return {
      state,
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

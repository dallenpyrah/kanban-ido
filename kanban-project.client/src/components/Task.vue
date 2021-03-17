<template>
  <div v-if="state.user.isAuthenticated" class="col-12">
    <div class="card text-dark m-2">
      <h6>Task: {{ task.task }} <i v-if="state.user.email == task.creatorId.email" class="fa fa-times text-danger" @click="deleteTask" aria-hidden="true"></i> <i class="fa fa-plus-square text-success" :data-target="`#create-comment` + task._id" data-toggle="modal" aria-hidden="true"></i></h6>
      <Comment v-for="comment in state.comment" :key="comment.id" :comment="comment" />
    </div>
  </div>
  <CreateCommentModal :task-data="task" />
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Comment from '../components/Comment'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListsService'
export default {
  name: 'Task',
  props: {
    task: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      task: computed(() => AppState.activeTask),
      comment: computed(() => AppState.comments[props.task.id])
    })
    onMounted(async() => await tasksService.getCommentsByTaskId(props.task.id))
    return {
      state,
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.task.id)
          await listsService.getTasksByListId(props.task.list)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {
    Comment
  }

}
</script>

<style>

</style>

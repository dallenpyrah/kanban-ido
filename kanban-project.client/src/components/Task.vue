<template>
  <div v-if="state.user.isAuthenticated" class="col-12">
  <CreateCommentModal :task-data="task" />
    <div class="card text-dark m-2">
      <h6>
        {{ task.task }}
        <i v-if="state.user.email == task.creatorId.email" class="fa fa-times text-danger p-1" @click="deleteTask" aria-hidden="true"></i>
        <br>
      </h6>
      <Comment v-for="comment in state.comment" :key="comment.id" :comment="comment" />
      <button class="btn" :data-target="`#create-comment` + task._id" data-toggle="modal" aria-hidden="true">
        <i class="fa fa-plus-square text-dark" aria-hidden="true"></i>
      </button>
    </div>
  </div>
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
    task: { type: Object, required: true },
    list: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      task: computed(() => AppState.activeTask),
      tasks: computed(() => AppState.tasks),
      list: computed(() => AppState.lists),
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

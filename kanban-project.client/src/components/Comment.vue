<template>
  <div class="col-12">
    <div class="card bg-dark text-light p-2 m-2">
      <h6>Comment:{{ comment.comment }} {{ comment.creatorId.email }}<i v-if="state.user.email == comment.creatorId.email" class="fa fa-times text-danger p-1" @click="deleteComment" aria-hidden="true"></i></h6>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { tasksService } from '../services/TasksService'
export default {
  name: 'Comment',
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      comment: computed(() => AppState.comments)
    })
    return {
      state,
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.comment.id)
          await tasksService.getCommentsByTaskId(props.comment.task)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}

}
</script>

<style>

</style>

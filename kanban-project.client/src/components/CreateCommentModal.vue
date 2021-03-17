<template>
  <div class="create-comment-modal">
    <div
      class="modal fade"
      :id="`create-comment` + taskData._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">
              Add your comment
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
            <form class="form-inline" @submit.prevent="createComment">
              <div class="form-group">
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  class="form-control"
                  placeholder="Enter Comment"
                  aria-describedby="helpId"
                  v-model="state.newComment.comment"
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
            <button class="btn btn-success" @click="createComment">
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
import { commentsService } from '../services/CommentsService'
import { tasksService } from '../services/TasksService'
export default {
  name: 'CreateCommentModal',
  props: {
    taskData: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      activeComment: computed(() => AppState.activeComment),
      newComment: { comment: '', task: props.taskData.id }
    })
    return {
      state,
      async createComment() {
        try {
          await commentsService.createComment(state.newComment)
          await tasksService.getCommentsByTaskId(props.taskData.id)
          state.newComment = { comment: '', task: props.taskData.id }
          $('#create-comment').modal('hide')
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

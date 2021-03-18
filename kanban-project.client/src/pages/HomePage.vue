<template>
  <div class="container-fluid height">
    <div class="row height align-items-center justify-content-center">
      <div class="text-center col-6">
        <button
          class="btn btn-outline-primary text-uppercase text-light text-size"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login to <br> Synoptic
        </button>
        <button v-else @click="goToBoards" class="btn btn-dark text-size">
          Go to Boards
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        await
        AuthService.loginWithPopup()
        router.push({ name: 'BoardsPage' })
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      },
      async goToBoards() {
        router.push({ name: 'BoardsPage' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.height{
  height: 80vh;
}
button{
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border-color:transparent;
  background: linear-gradient(rgb(228, 64, 64), rgb(51, 18, 58), rgb(194, 76, 188) )
}
button:hover{
  box-shadow: 1px 3px 5px rgb(94, 94, 94);
  cursor: pointer
}

.text-size{
  font-size: 25px;
}
</style>

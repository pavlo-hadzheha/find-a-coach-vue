<template>
  <header class="mb-6 header">
    <div id="brand" class="font-sans text-3xl font-bold text-blue-500 rounded-lg">
      <router-link to="/">
        Find a Coach
      </router-link>
    </div>
    <nav id="nav">
      <router-link to="/coaches" class="relative nav-item">
        <el-button class="nav-item-btn" type="text" round>Coaches</el-button>
      </router-link>
      <router-link to="/requests" class="relative nav-item" v-if="loggedIn">
        <el-button class="nav-item-btn" type="text">Dialogs</el-button>
      </router-link>
      <template v-if="!loggedIn">
        <router-link to="/auth/login" class="relative nav-item">
          <el-button class="nav-item-btn" type="text">SignIn</el-button>
        </router-link>
        <router-link to="/auth/register" class="relative nav-item">
          <el-button class="nav-item-btn" type="text">SignUp</el-button>
        </router-link>
      </template>
      <template v-else>
        <el-button @click="logout">LogOut</el-button>
        <router-link to="/profile">
          <el-button type="primary" circle>
            <el-icon>
              <user-icon></user-icon>
            </el-icon>
          </el-button>
        </router-link>
      </template>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  computed: {
    ... mapGetters({loggedIn: 'auth/userIsAuthenticated'})
  },
  methods: {
    ... mapActions({logout: 'auth/logout'})
  }
})
</script>


<style scoped>
.header {
  @apply bg-green-200 duration-200 py-6 px-8 flex items-center;
}
#nav {
  @apply flex justify-end items-center gap-8 flex-grow;
}

.nav-item-btn {
  @apply font-bold hover:text-blue-600 text-blue-500 text-lg duration-200;
}

.nav-item {
  min-width: 90px;
  text-align: center;
}

.nav-item.router-link-active::before {
  content: '';
  @apply absolute bottom-0 left-0 right-0 h-1 bg-blue-600 duration-300;
}


</style>

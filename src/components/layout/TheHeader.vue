<template>
  <header class="mb-6 header">
    <div id="brand" class="font-sans text-3xl font-bold text-blue-500 rounded-lg">
      <router-link to="/">
        Find a Coach
      </router-link>
    </div>
    <nav id="nav">
      <router-link to="/coaches" class="nav-item">
        <el-button type="primary" round>Coaches</el-button>
      </router-link>
      <router-link to="/requests" class="nav-item">
        <el-button type="success" round>Requests</el-button>
      </router-link>
      <router-link to="/auth" class="nav-item">
        <el-button class="text-red-600" plain>Login</el-button>
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  @apply bg-green-200 duration-200 py-6 px-8 flex items-center;
}
#nav {
  @apply flex justify-end items-start gap-8 flex-grow;
}

#nav a.router-link-active {
  outline: 2px solid white;
  outline-offset: 5px;
}


</style>

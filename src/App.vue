<template>

<router-view v-slot="{ Component }">
  <keep-alive include="Home" exclude="Details">
    <component :is="Component" :key="$route.fullPath"></component>
  </keep-alive>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app h1 {
  margin: 4rem;
  text-align: center;
}

#nav {
  padding: 30px;
}

a:link {
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

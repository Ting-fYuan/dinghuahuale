<template>
  <div id="app">
    <!-- 入口文件 -->
    <keep-alive><router-view v-if="$route.meta.keepAlive" /></keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<style lang="scss">
#app {
}

body {
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: rgba(246, 246, 246, 1);
}
</style>

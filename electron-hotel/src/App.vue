<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Home from '@/views/Home.vue'

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  margin-top 20px

</style>

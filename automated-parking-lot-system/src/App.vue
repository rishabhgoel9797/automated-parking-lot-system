<template>
  <div id="app">
    <div class="heading">
            <h3>Automated Parking Lot System</h3>
        </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.heading {
  color: white;
  background: #008385;
  text-align: center;
  padding: 5px 0px;
  border-radius: 10px;
}
input, select {
  padding: 12px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">List Accounts</router-link> |
      <router-link to="/createHuman">Sign up</router-link> |
      <router-link to="/viewActivities">View Activities</router-link> |
      <router-link to="/createActivity">Create Activity</router-link> |

      <router-link to="/PersonalActivities">Personal Activities</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/signOut">signOut</router-link>
    </div>
    <hr>
    <div>
        <div v-if="user.isSignedIn">
            You are signed in :)
        </div>
        <div v-else >
            You are not signed in :(
        </div>
    </div>
    <router-view :user="user"/>
  </div>
</template>

<script>

module.exports = {
  // ...
  data(){
    return {
      // ...
      user: {
        isSignedIn: false,
        accountId: ""
      }
    }
  }
}

</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
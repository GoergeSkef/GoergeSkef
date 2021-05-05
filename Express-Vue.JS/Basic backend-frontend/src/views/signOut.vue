<template>
  <div>
    <h1>Login</h1>
    <form v-on:submit.prevent="signOut()" >
      <div>    Are you sure you want to Sign Out  </div>
      <input type="submit" value="Sign Out" />
    </form>
  </div>
</template>
<script>
const client = require('../activity-finder')

export default {
    props: ["user"],


    methods:{
        signOut(){
            client.signOut((account) => {
                    (this.user.isSignedIn = false);
                })
        }
    }
}
</script>

<template>
  <div>
    <h1>View Account</h1>
    <div v-if="account">
      <div>Id: {{account.id}}</div>
      <div>Username: {{account.username}}</div>
      <div>Password: {{account.password}}</div>
    </div>
    <p v-else>No Account with that id exists.</p>
  </div>
</template>

<script>
const client = require('../item-finder')

export default {
  props: ["user"],
  data(){
    
    return {
      account:[],
      error:[]
    }
  },
  created() {
    client.getAccountById(this.$route.params.id, (errors, account) => {
    // errors = array with error codes (empty if everything went OK).
    // account = object with info about the account if everything went OK.
    if(errors.length == 0){
      this.account = account
    }else{
        this.error = error

    }
  })
  }
}




</script>
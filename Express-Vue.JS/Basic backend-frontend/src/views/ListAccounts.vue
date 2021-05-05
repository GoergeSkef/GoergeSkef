<template>
  <div>
    <h1>List My Accounts</h1>
    <div v-if="accounts.length == 0">No accounts exist.</div>
      <p v-if="isLoading"> wait I m feching them </p>
      <ul v-else-if="0 < errors.length">
        <li v-for="error in errors" :key="error"> {{error}} </li>
      </ul>
      <ul v-else>
        <li v-for="account in accounts" :key="account.id">
          <router-link :to="'/viewAccount/'+account.id">{{account.username}}</router-link>
        </li>
      </ul>
  </div>
</template>

<script>
const client = require('../activity-finder')

export default {
  props: ["user"],
  data(){
    return{
    accounts: [],
    errors: [],
    isLoading: true
    }
  },
  created(){ 
    client.getAllAccounts((errors, accounts) => {
    this.isLoading= false
      if(errors.length == 0){
        this.accounts= accounts
      }else{
        this.errors= errors

      }
    })
  }
}

</script>
<template>
  <div>
    <h1>Create Human</h1>
    <form @submit.prevent="createAccount()">
      <div>
        Name: <input v-model="username">
      </div>
      <div>
        Password: <input v-model="password">
      </div>
      <input type="submit" value="Create">
    </form>
  </div>
</template>

<script>
const client = require('../item-finder')

export default {
    props: ["user"],
    data(){
      
      return {
        username:"",
        password:"",
        account: [],
        errors: [],
        
      }
    },
    methods: {
      createAccount(){

        const account = {
          username: this.username,
          password: this.password
        }

        client.createAccount(account, (errors, id) => {
                this.account = {
                username: this.username,
                password: this.password
              }
                
                // errors = array with error codes (empty if everything went OK).
                // id = the id the newly created account got if everything went OK.
                if(errors.length == 0){
                  this.id = id
                }else{
                  this.errors = errors
                  //  - "networkError": Couldn't connect to the backend.
                  //  - "backendError": The backend couldn't execute the request for some reason.
                  //  - "invalidAccount": The account object is wrong.
                  //  - "usernameTooShort": The username is too short.
                  //  - "usernameTooLong": The username is too long.
                  //  - "passwordTooShort": The password is too short.
                  //  - "usernameTaken": The username is already used by another account.
                }
              })
      }

    }
}







</script>
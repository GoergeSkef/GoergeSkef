<template>
  <div>
    <h1>View item Detailes</h1>
    <div v-if="item">
      <div>Id: {{item.id}}</div>
      <div>Title: {{item.title}}</div>
      <div>Description: {{item.description}}</div>
      <div>Item: {{item.images}}</div>
      <button to="/viewActivities/" v-on:click="deleteItem()"> Delete </button>
    </div>
    
  </div>
</template>

<script>
const client = require('../item-finder')

export default {
  props: ["user"],
  data(){
     return {
      item: [],
      errors: [],
    };
  },
  
        methods:{
          deleteItem(){
              client.deleteItemById(this.item.id, (errors, itemExisted) => {
                // errors = array with error codes (empty if everything went OK).
                if(errors.length == 0){
                  
                  // itemExisted = true or false
                }else{
                  this.errors= errors
                  // errors = ["errorCode1", "errorCode2", ...]
                  // Possible errors codes:
                  //  - "networkError": Couldn't connect to the backend.
                  //  - "backendError": The backend couldn't execute the request for some reason.
                  //  - "notAuthenticated": The user is not signed in.
                  //  - "notAuthorized": The user tries to delete an item that doesn't belong to the account the user is signed into.
                }
              })
          }

    },
      created() {
        client.getItemById(this.$route.params.id, (errors, item) => {

        if(errors.length == 0){
          this.item = item
        }else{
            this.errors = errors

        }
      })
    }
}
</script>
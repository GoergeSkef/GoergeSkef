<template>
  <div v-if="user.isSignedIn==true">
    <h1>List My items</h1>
    <div v-if="items.length== 0">No items exist.</div>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        
        <router-link :to="'/UpdateActivity/'+item.id">{{item.title}}</router-link> 
        <router-link :to="'/DeleteActivity/'+ item.id" tag= "button" > Delete </router-link>
      </li>
    </ul>
    <h1></h1>
  </div>
  <div v-else-if="user.isSignedIn==false"> sign in to your account </div>
</template>
<script>
  
const client = require('../item-finder')

export default {
  props: ["user"],
  data(){
    return{
      items:[],
      errors:[]
    }
  },

created(){
  client.getItemsByAccountId(this.user.accountId, (errors, items) => {

    if(errors.length == 0){
      (this.items= items)
      // items = [{id: 1, accountId: 3, title: "Watch the sky", ...}, {...}, ...]
    }else{
      this.errors= errors
      // errors = ["errorCode1", "errorCode2", ...]
      // Possible errors codes:
      //  - "networkError": Couldn't connect to the backend.
      //  - "backendError": The backend couldn't execute the request for some reason.
    }
  })
}

}
</script>

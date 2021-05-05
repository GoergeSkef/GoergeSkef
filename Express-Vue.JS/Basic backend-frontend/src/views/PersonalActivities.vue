<template>
  <div v-if="user.isSignedIn==true">
    <h1>List My activities</h1>
    <div v-if="activities.length== 0">No activities exist.</div>
    <ul v-else>
      <li v-for="activity in activities" :key="activity.id">
        
        <router-link :to="'/UpdateActivity/'+activity.id">{{activity.title}}</router-link> 
        <router-link :to="'/DeleteActivity/'+ activity.id" tag= "button" > Delete </router-link>
      </li>
    </ul>
    <h1></h1>
  </div>
  <div v-else-if="user.isSignedIn==false"> sign in to your account </div>
</template>
<script>
  
const client = require('../activity-finder')

export default {
  props: ["user"],
  data(){
    return{
      activities:[],
      errors:[]
    }
  },

created(){
  client.getActivitiesByAccountId(this.user.accountId, (errors, activities) => {

    if(errors.length == 0){
      (this.activities= activities)
      // activities = [{id: 1, accountId: 3, title: "Watch the sky", ...}, {...}, ...]
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

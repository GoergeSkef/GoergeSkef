<template>
  <div>
    <h1>List My activities</h1>
    <div>Username Id: {{activities.accountId}}</div>
    <div v-if="activities.length == 0">No activities exist.</div>
    <ul v-else>
      <li v-for="activity in activities" :key="activity.accountId">
        <router-link :to="'/UpdateActivity/'+activity.id">{{activity.title}}</router-link>
        <button :to="/DeleteActivity/"> Delete</button>
      </li>
    </ul>
    <h1></h1>
  </div>
</template>
<script>
  
const client = require('../activity-finder')

export default {
  props: ["user"],
  data(){
    return{
      accountId:[],
      activities:[],
      errors:[]
    }
  },

created(){
  client.getActivitiesByAccountId( this.user.accountId, (errors, activities) => {

    if(errors.length == 0){
      (this.activities= activities), (this.user.accountId = account.id);
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

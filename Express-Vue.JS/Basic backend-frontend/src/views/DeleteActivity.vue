<template>
  <div>
    <h1>View Activity Detailes</h1>
    <div v-if="activity">
      <div>Id: {{activity.id}}</div>
      <div>Title: {{activity.title}}</div>
      <div>Description: {{activity.description}}</div>
      <div>Starting Time: {{activity.startTime}}</div>
      <div>End Time: {{activity.endTime}}</div>
      <button to="/viewActivities/" v-on:click="deleteActivity()"> Delete </button>
    </div>
    
  </div>
</template>

<script>
const client = require('../activity-finder')

export default {
  props: ["user"],
  data(){
     return {
      activity: [],
      errors: [],
    };
  },
  
        methods:{
          deleteActivity(){
              client.deleteActivityById(this.activity.id, (errors, activityExisted) => {
                // errors = array with error codes (empty if everything went OK).
                if(errors.length == 0){
                  
                  // activityExisted = true or false
                }else{
                  this.errors= errors
                  // errors = ["errorCode1", "errorCode2", ...]
                  // Possible errors codes:
                  //  - "networkError": Couldn't connect to the backend.
                  //  - "backendError": The backend couldn't execute the request for some reason.
                  //  - "notAuthenticated": The user is not signed in.
                  //  - "notAuthorized": The user tries to delete an activity that doesn't belong to the account the user is signed into.
                }
              })
          }

    },
      created() {
        client.getActivityById(this.$route.params.id, (errors, activity) => {

        if(errors.length == 0){
          this.activity = activity
        }else{
            this.errors = errors

        }
      })
    }
}
</script>
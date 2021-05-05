<template>
  <div>
    <h1>View Activity</h1>
    <div v-if="activity">
      <div>Id: {{activity.id}}</div>
      <div>Title: {{activity.title}}</div>
      <div>Description: {{activity.description}}</div>
      <div>Starting Time: {{activity.startTime}}</div>
      <div>End Time: {{activity.endTime}}</div>
    </div>
    <p v-else>No Activity with that id exists.</p>
  </div>
</template>

<script>
const client = require('../activity-finder')

export default {
  props: ["user"],
  data(){
    
    return {
      activity:[],
      errors:[]
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
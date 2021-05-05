<template>
  <div>
    <h1>View activities</h1>
    <div v-if="activities.length == 0">No activities exist.</div>
    <ul v-else>
      <li v-for="activity in activities" :key="activity.id">
        <router-link :to="'/viewActivity/'+activity.id">{{activity.title}}</router-link>
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
    activities: [],
    errors: []
    }
  },
  created(){ 
    client.getAllActivities((errors, activities) => {
    
      if(errors.length == 0){
        this.activities= activities
      }else{
        this.errors= errors

      }
    })
  }
}

</script>
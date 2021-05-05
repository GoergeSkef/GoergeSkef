<template>
  <div>
    <h1>View Detailes</h1>
    <div v-if="activity">
      <div>Id: {{activity.id}}</div>
      <div>Title: {{activity.title}}</div>
      <div>Description: {{activity.description}}</div>
      <div>Starting Time: {{activity.startTime}}</div>
      <div>End Time: {{activity.endTime}}</div>
    </div>
    <h1>Update Activity</h1>
    <form @submit.prevent="updatedActivity()">
      <div>
        Title:
        <input v-model="title" />
      </div>
      <div>
        Description:
        <input v-model="description" />
      </div>
      <div>
        Start Time:
        <input type="datetime-local" v-model="startTime" />
      </div>
      <div>
        End Time:
        <input type="datetime-local" v-model="endTime" />
      </div>
      <div>
        Longitude:
        <input type="text" v-model.number="latitude"/>
      </div>
      <div>
        Latitude:
        <input type="text"  v-model.number="longitude"/>
      </div>
      <input type="submit" value="update"/>
    </form>
  </div>
</template>

<script>
const client = require('../activity-finder')

export default {
  props: ["user"],
  data(){
      return{
            activity:[],
            errors:[],
            title: "",
            description: "",
            startTime: "", // Unix timestamp (milliseconds)
            endTime: "", // Unix timestamp (millisecond)
            latitude: 57.77859078562013,
            longitude: 14.16189193725586
            
      }


  },
  methods:{
    updatedActivity(){
            const updatedActivity = {
                id: this.activity.id,
                accountId: parseInt(this.activity.accountId),
                title: this.title,
                description: this.description,
                startTime: Date.parse(this.startTime),
                endTime: Date.parse(this.endTime) ,
                latitude: this.latitude,
                longitude: this.longitude
            }
        client.updateActivityById(this.$route.params.id,updatedActivity, (errors) => {
                // errors = array with error codes (empty if everything went OK).
                if(errors.length == 0){
                }else{
                  this.errors= errors
                  // errors = ["errorCode1", "errorCode2", ...]
                  // Possible errors codes:
                  //  - "networkError": Couldn't connect to the backend.
                  //  - "backendError": The backend couldn't execute the request for some reason.
                  //  - "notFound": No activity with the given id exists.
                  //  - "invalidActivity": The activity object is wrong.
                  //  - "notAuthenticated": The user is not signed in.
                  //  - "notAuthorized": The user tries to update an activity for an account the user is not signed in to.
                  //  - "idChanged": The id changed (not allowed).
                  //  - "started": The activity has already started.
                  //  - "titleTooShort": The title is too short.
                  //  - "titleTooLong": The title is too long.
                  //  - "descriptionTooShort": The description is too short.
                  //  - "descriptionTooLong": The description is too long.
                  //  - "startTimeTooEarly": The start time is changed to a time that has already been.
                  //  - "endingBeforeStarting": The end time is before the start time.
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
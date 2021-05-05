<template>
  <div v-if="user.isSignedIn==true">
    <h1>Create Human</h1>
    <form @submit.prevent="createActivity()">
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
      <input type="submit" value="Create" />
    </form>
  
  <div v-if="errors.length == 0">No errors exist.</div>
  <ul v-else>
      <li v-for="error in errors" :key="error">{{error}} </li>
  </ul>
  
  
  </div>
  <div v-else-if="user.isSignedIn==false"> sign in to your account </div>
</template>

<script>
const client = require('../activity-finder')

export default {
props: ["user"],

data(){
      return{
            errors: [],
            accountId: this.$route.params.id, // The id of the account creating the activity (i.e. the signed in user's account id).
            title: "",
            description: "",
            startTime: "", // Unix timestamp (milliseconds)
            endTime: "", // Unix timestamp (millisecond)
            latitude: 57.77859078562013,
            longitude: 14.16189193725586
            
      }
  },
    methods:{
        createActivity(){

            const activity = {
                accountId: this.user.accountId,
                title: this.title,
                description: this.description,
                startTime: Date.parse(this.startTime),
                endTime: Date.parse(this.endTime) ,
                latitude: this.latitude,
                longitude: this.longitude
                }

            client.createActivity(activity, (errors, id) => {
                // errors = array with error codes (empty if everything went OK).
                // id = the id the newly created activity got if everything went OK.
                if(errors.length == 0) {
                    this.id= id
                }else{
                    this.errors = errors
                    // Possible errors codes:
                    //  - "networkError": Couldn't connect to the backend.
                    //  - "backendError": The backend couldn't execute the request for some reason.
                    //  - "invalidActivity": The activity object is wrong.
                    //  - "notAuthenticated": The user is not signed in.
                    //  - "notAuthorized": The user tries to create an activity for an account the user is not signed in to.
                    //  - "accountNotFound": No account with the id 'accountId' exists.
                    //  - "titleTooShort": The title is too short.
                    //  - "titleTooLong": The title is too long.
                    //  - "descriptionTooShort": The description is too short.
                    //  - "descriptionTooLong": The description is too long.
                    //  - "startTimeTooEarly": The start time has already been.
                    //  - "endingBeforeStarting": The end time is before the start time.
                }

            })
        }
    }


}
</script>
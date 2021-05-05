<template>
  <div v-if="user.isSignedIn==true">
    <h1>Create Item</h1>
    <form @submit.prevent="createItem()" >
      <div>
        Title:
        <input v-model="title" />
      </div>
      <div>
        Description:
        <input v-model="description" />
      </div>
      <div>
        Upload Image
        <picture-input
          ref="pictureInput"
          @change="onChanged"
          @remove="onRemoved"
          :width="500"
          :removable="true"
          removeButtonClass="ui red button"
          :height="500"
          accept="image/jpeg "
          buttonClass="ui button primary"
          :customStrings="{
          upload: '<h1>Upload it!</h1>',
          drag: 'Drag and drop your image here'}">
        </picture-input >

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

const client = require('../item-finder')

import PictureInput from 'vue-picture-input'
import FormDataPost from '../imageUpload'

export default {
props: ["user"],
 name: 'app',

data(){
      return{
            errors: [],
            accountId: this.$route.params.id, // The id of the account creating the item (i.e. the signed in user's account id).
            title: "",
            description: "",
            images: "", 
            
      }
  },
    components: {
      PictureInput
    },
    methods:{
        
          onChanged() {
            console.log("New picture loaded");
            if (this.$refs.pictureInput.file) {
              this.images = this.$refs.pictureInput.file;
            } else {
              console.log("Old browser. No support for Filereader API");
            }
          },
          onRemoved() {
            this.images = '';
          },
        createItem(){
          
          FormDataPost('http://localhost:3000/uploadImage', this.images)
            .then(response=>{
              console.log("Uploaded picture successfully");

              const item = {
                accountId: this.user.accountId,
                title: this.title,
                description: this.description,
                images: response.data.replace("\\", "/")
                }

              client.createItem(item, (errors, id) => {
                  // errors = array with error codes (empty if everything went OK).
                  // id = the id the newly created item got if everything went OK.
                  if(errors.length == 0) {
                      this.id= id
                  }else{
                      this.errors = errors
                      // Possible errors codes:
                      //  - "networkError": Couldn't connect to the backend.
                      //  - "backendError": The backend couldn't execute the request for some reason.
                      //  - "invaliditem": The item object is wrong.
                      //  - "notAuthenticated": The user is not signed in.
                      //  - "notAuthorized": The user tries to create an item for an account the user is not signed in to.
                      //  - "accountNotFound": No account with the id 'accountId' exists.
                      //  - "titleTooShort": The title is too short.
                      //  - "titleTooLong": The title is too long.
                      //  - "descriptionTooShort": The description is too short.
                      //  - "descriptionTooLong": The description is too long.
                      //  - "startTimeTooEarly": The start time has already been.
                      //  - "endingBeforeStarting": The end time is before the start time.
                  }

              })
            })
            .catch(err=>{
              console.error(err);
            });


        }
    }


}
</script>
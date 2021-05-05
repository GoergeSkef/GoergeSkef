<template>
  <div>
    <h1>View Detailes</h1>
    <div v-if="item">
      <div>Id: {{item.id}}</div>
      <div>Title: {{item.title}}</div>
      <div>Description: {{item.description}}</div>
      <div>
        <img ref="pictureInput"
            :width="500"
            :height="500"
            accept="image/jpeg, image/png, image/gif"
            :src="'http://localhost:3000/'+item.images" alt="">
      </div>
    </div><br><br>
    <h1>Update item</h1>
    <form @submit.prevent="updatedItemById()">
      <div>
        Title:
        <input v-model="title" />
      </div>
      <div>
        Description:
        <input v-model="description" />
      </div>
      <div>
        Item:
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
          drag: 'Drag and drop your image here'}" >
        </picture-input >
      </div>
      
      <input type="submit" value="update"/>
    </form>
  </div>
</template>

<script>
const client = require('../item-finder')

import PictureInput from 'vue-picture-input'
import FormDataPost from '../imageUpload'

export default {
  props: ["user"],
  data(){
      return{
            item:[],
            errors: [],
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
    updatedItemById(){

      FormDataPost('http://localhost:3000/uploadImage', this.images)
            .then(response=>{
              console.log("Uploaded picture successfully");

            const updateditem = {
                id: parseInt(this.item.id),
                accountId: parseInt(this.item.accountId),
                title: this.title,
                description: this.description,
                images: response.data.replace("\\", "/")
            }
        client.updateItemById(this.$route.params.id, updateditem, (errors) => {
                // errors = array with error codes (empty if everything went OK).
                if(errors.length == 0){
                }else{
                  this.errors= errors
                  // errors = ["errorCode1", "errorCode2", ...]
                  // Possible errors codes:
                  //  - "networkError": Couldn't connect to the backend.
                  //  - "backendError": The backend couldn't execute the request for some reason.
                  //  - "notFound": No item with the given id exists.
                  //  - "invaliditem": The item object is wrong.
                  //  - "notAuthenticated": The user is not signed in.
                  //  - "notAuthorized": The user tries to update an item for an account the user is not signed in to.
                  //  - "idChanged": The id changed (not allowed).
                  //  - "started": The item has already started.
                  //  - "titleTooShort": The title is too short.
                  //  - "titleTooLong": The title is too long.
                  //  - "descriptionTooShort": The description is too short.
                  //  - "descriptionTooLong": The description is too long.
                  //  - "startTimeTooEarly": The start time is changed to a time that has already been.
                  //  - "endingBeforeStarting": The end time is before the start time.
              }
            })
            })
            .catch(err=>{
              console.error(err);
            });
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
<template>
  <div>
    <h1>View item</h1>
    <div v-if="item">
        <div>Id: {{item.id}}</div>
        <div>Title: {{item.title}}</div>
        <div>Description: {{item.description}}</div>
        <div>Item <br>
          <img 
            :width="500"
            :height="500"
            :src="'http://localhost:3000/'+item.images" alt="" >
            
          </div>
        
        <input type="text" v-model="comment"/> <button  @click="createComment()">comment</button>
        <li v-for="comment in comments" :key="comment.id">
          <router-link :to="'/updateNdeleteComment/'+comment.id">{{comment.userComment}}</router-link>
        </li>
    </div>
    <p v-else>No item with that id exists.</p>
  </div>
</template>

<script>
const client = require('../item-finder')

export default {
  props: ["user"],
  data(){
    
    return {
      item:null,
      comments:[],
      comment:"",
      errors:[],
      id: this.$route.params.id
    }
  },
  methods:{
    createComment(){
      const comment = {
                accountId: parseInt(this.user.accountId),
                id: parseInt(this.$route.params.id),
                comment: this.comment
                }

              client.createComment(comment, (errors, id) => {
                  // errors = array with error codes (empty if everything went OK).
                  // id = the id the newly created comment got if everything went OK.
                  if(errors.length == 0) {
                      this.this.$route.params.id= id
                  }else{
                      this.errors = errors
                      // Possible errors codes:
                      //  - "networkError": Couldn't connect to the backend.
                      //  - "backendError": The backend couldn't execute the request for some reason.
                      //  - "invalidcomment": The comment object is wrong.
                      //  - "notAuthenticated": The user is not signed in.
                      //  - "notAuthorized": The user tries to create an comment for an account the user is not signed in to.
                      //  - "accountNotFound": No account with the id 'accountId' exists.
                      //  - "titleTooShort": The title is too short.
                      //  - "titleTooLong": The title is too long.
                      //  - "descriptionTooShort": The description is too short.
                      //  - "descriptionTooLong": The description is too long.
                      //  - "startTimeTooEarly": The start time has already been.
                      //  - "endingBeforeStarting": The end time is before the start time.
                  }
        })
    },
  },
  created() {
      client.getItemById(this.$route.params.id, (errors, item) => {

      if(errors.length == 0){
        this.item = item
      }else{
          this.errors = errors

      }
    })

    client.getAllComments((errors, comments) => {
    
      if(errors.length == 0){
        this.comments= comments
      }else{
        this.errors= errors

      }
    })
  }
}




</script>
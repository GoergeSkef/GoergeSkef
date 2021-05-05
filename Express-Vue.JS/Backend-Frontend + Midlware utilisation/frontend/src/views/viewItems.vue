<template>
  <div>
    <h1>View items</h1>
    <div v-if="items.length == 0">No items exist.</div>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        <router-link :to="'/viewItem/'+item.id">{{item.title}}</router-link><br>
        <img ref="pictureInput"
            :width="400"
            :height="400"
            accept="image/jpeg, image/png, image/gif"
            :src="'http://localhost:3000/'+item.images" alt=""><br>
        <router-link :to="'/DeleteItem/'+item.id" tag="button"> Delete </router-link>
        <router-link :to="'/UpdateItem/'+item.id" tag="button"> Update </router-link>
       
      </li>
    </ul>
  </div>
</template>

<script>
const client = require('../item-finder')

export default {
  props: ["user"],
  data(){
    return{
    items: [],
    errors: []
    }
  },
  created(){ 
    client.getAllItems((errors, items) => {
    
      if(errors.length == 0){
        this.items= items
      }else{
        this.errors= errors

      }
    })
  }
}

</script>
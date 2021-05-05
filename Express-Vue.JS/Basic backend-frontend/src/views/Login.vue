<template>
  <div>
    <h1>Login</h1>
    <form v-on:submit.prevent="signIn()" class="form">
      <div class="username">
        Username:
        <input type="text" v-model="username" />
      </div>
      <div class="password">
        Password:
        <input type="password" v-model="password" />
      </div>
      <input type="submit" value="Login" class="submit" />
      <ul v-if="0 < errors.length" class="errors">
        <li v-for="error in errors" v-bind:key="error">{{error}}</li>
      </ul>
    </form>
  </div>
</template>

<script>
const client = require("../activity-finder");
export default {
  props: ["user"],

  data() {
    return {
      username: "",
      password: "",
      account: [],
      errors: [],
    };
  },
  methods: {
    signIn() {

      client.signIn(this.username, this.password, (errors, account) => {
        this.account = {
          username: this.username,
          password: this.password,
        };

        if (errors.length == 0) {
            
          //ass lab instructions say to do it
          (this.account = account), (this.user.isSignedIn = true), (this.user.accountId = account.id);
          console.log(account, this.user);
        } else {
          this.errors = errors;
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "wrongCredentials": The username of password is incorrect.
        }
      });
    }
  }
};
</script>
<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
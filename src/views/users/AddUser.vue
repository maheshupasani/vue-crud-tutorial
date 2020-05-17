<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          required
          v-model="user.first_name"
          name="first_name"
        />
      </div>
			<div class="form-group">
        <label for="last_name">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="last_name"
          required
          v-model="user.last_name"
          name="last_name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          required
          v-model="user.email"
          name="email"
        />
      </div>
      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>Your user added successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>
<script>
import UsersDataService from "@/services/UsersDataService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
				first_name: "",
				last_name: "",
        email: ""
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        job: this.user.job
      };
      UsersDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          this.submitted = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    newUser() {
      this.submitted = false;
      this.user = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

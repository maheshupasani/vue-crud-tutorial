<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User Details</h4>
    <form>
      <div class="form-group">
        <label for="name">First Name</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="first_name"
          v-model="currentUser.first_name"
        />
      </div>
      <div class="form-group">
        <label for="name">Last Name</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="last_name"
          v-model="currentUser.last_name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="email"
          v-model="currentUser.email"
        />
      </div>

      <!-- <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentUser.published ? "Published" : "Pending" }}
      </div> -->
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentUser.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteUser">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateUser">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>
<script>
import UsersDataService from "@/services/UsersDataService";
export default {
  name: "users-details",
  data() {
    return {
      currentUser: null,
      message: ""
    };
  },
  mounted() {
    this.message = "";
    this.getUser(this.$route.params.id);
  },
  methods: {
    getUser(id) {
      UsersDataService.get(id)
        .then(response => {
          this.currentUser = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentUser.id,
        title: this.currentUser.title,
        description: this.currentUser.description,
        published: status
      };

      UsersDataService.update(this.currentUser.id, data)
        .then(response => {
          this.currentUser.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UsersDataService.update(this.currentUser.id, this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = "The user was updated successfully!";
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UsersDataService.delete(this.currentUser.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "users" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

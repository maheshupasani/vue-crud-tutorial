<template>
  <div class="list row">
    <!-- <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div> -->
    <div class="col-md-6">
      <h4>Users List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveUser(user, index)"
        >
          <div class="row">
            <div class="col-3">
              <img
                :src="user.avatar"
                alt="..."
                class="rounded-circle"
                style="width:64px;"
              />
            </div>
            <div class="col-9">
              <div>{{ user.first_name }} {{ user.last_name }}</div>
              <small>(email: {{ user.email }})</small>
            </div>
          </div>
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentUser">
        <h4>User</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentUser.first_name }}
          {{ currentUser.last_name }}
        </div>
        <div>
          <label><strong>Email Id:</strong></label>
          {{ currentUser.email }}
        </div>
        <div>
          <label><strong>Photo:</strong></label>
          <img
            :src="currentUser.avatar"
            alt="..."
            class="rounded-circle"
            style="width:64px;"
          />
        </div>
        <!-- <div>
          <label><strong>Status:</strong></label>
          {{ currentUser.published ? "Published" : "Pending" }}
        </div> -->
        <router-link
          :to="{ path: '/users/' + currentUser.id }"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a User...</p>
      </div>
    </div>
  </div>
</template>
<script>
import UsersDataService from "@/services/UsersDataService";
export default {
  name: "users-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      title: ""
    };
  },
  mounted() {
    this.retrieveUsers();
  },
  methods: {
    retrieveUsers() {
      UsersDataService.getAll()
        .then(response => {
          this.users = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },
    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },
    removeAllUsers() {
      UsersDataService.deleteAll()
        .then(response => {
          this.users = response.data.data;
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchTitle() {
      UsersDataService.findByTitle(this.title)
        .then(response => {
          this.users = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>

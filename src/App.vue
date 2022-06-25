<script setup>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";

import { useConnection } from "./connection";

const route = useRoute();

useConnection();
</script>

<template>
  <div class="container">
    <Header />

    <div class="main-wrapper">
      <ul class="tabs">
        <li class="tab" :class="{ 'tab--active': route.path === '/' }">
          <router-link to="/">Dashboard</router-link>
        </li>
        <li class="tab" :class="{ 'tab--active': route.path === '/portfolio' }">
          <router-link to="/portfolio">Portfolio</router-link>
        </li>
        <li class="tab" :class="{ 'tab--active': route.path === '/settings' }">
          <router-link to="/settings">Settings</router-link>
        </li>
      </ul>
      <div class="main-view">
        <div class="view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  max-width: 1360px;
  width: 95%;
  margin: 0 auto;
}

.main-wrapper {
  margin-top: 4rem;

  .main-view {
    background: var(--lighter-dark);
    padding: 2rem;
    border-radius: 1rem;
  }
}

.tabs {
  display: flex;
  background: #2c2c2c;
  width: fit-content;
  list-style: none;
  overflow: hidden;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  margin-left: 2rem;

  .tab {
    padding: 1rem;
  }

  a {
    color: #ccc;
    text-decoration: none;
  }

  .tab--active {
    background: var(--lighter-dark);

    a {
      color: #eee;
    }
  }
}
</style>

<template>
  <div id="nav" class="text-center pt-10">
    <router-link class="mx-6" to="/">Home</router-link>
    <router-link class="mx-6" to="/ListKomentar">List Komentar</router-link>
  </div>
  <router-view />
</template>

<style>
#nav a.router-link-exact-active {
  color: #417bee;
  font-weight: 700;
}
</style>

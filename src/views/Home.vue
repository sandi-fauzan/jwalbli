<template>
  <div class="home">
    <Jumbo />
    <About />
  </div>
</template>

<script>
import Jumbo from "@/views/main/Jumbo";
import About from "@/views/main/About";

export default {
  name: "Home",
  components: { Jumbo, About },
};
</script>

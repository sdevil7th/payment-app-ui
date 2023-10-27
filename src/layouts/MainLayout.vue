<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavBar from 'src/components/NavBar.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavBar,
  },

  setup() {
    const leftDrawerOpen = ref(true);

    return {
      leftDrawerOpen,
    };
  },
});
</script>

<template>
  <div class="mobileScrollContainer">
    <div class="emptyPlaceholder"></div>
    <FunctionBtnsGroup />
    <CardDetail />
  </div>
</template>

<script lang="ts" setup>
import FunctionBtnsGroup from './FunctionBtnsGroup.vue';
import CardDetail from './CardDetail.vue';
</script>

<style scoped>
.emptyPlaceholder {
  height: 530px;
  background: transparent;
}
.mobileScrollContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  pointer-events: none;
}
</style>

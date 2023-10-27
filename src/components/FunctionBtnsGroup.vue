<template>
  <div
    :class="
      $q.screen.lt.md
        ? 'row q-pa-md functionBtnsContainer'
        : 'row q-pa-md deskFunctionBtnsContainer'
    "
  >
    <q-btn
      flat
      color="transparent"
      text-color="blue-10"
      class="functionBtnItem"
      :disable="selectedCardDetails.cardNumber === DUMMY_NAME"
      @click="toggleFreezeCard"
    >
      <img src="../assets/icons/Freeze card.svg" class="q-mb-sm" />
      {{ !selectedCardDetails.frozen ? 'Freeze Card' : 'Unfreeze Card' }}
    </q-btn>
    <q-btn
      flat
      color="transparent"
      text-color="blue-10"
      class="functionBtnItem"
    >
      <img src="../assets/icons/Set-spend-limit.svg" class="q-mb-sm" />
      Set spend limit
    </q-btn>
    <q-btn
      flat
      color="transparent"
      text-color="blue-10"
      class="functionBtnItem"
    >
      <img src="../assets/logos/GPay.svg" class="q-mb-sm" />
      Add to GPay
    </q-btn>
    <q-btn
      flat
      color="transparent"
      text-color="blue-10"
      class="functionBtnItem"
    >
      <img src="../assets/icons/Replace-card.svg" class="q-mb-sm" />
      Replace card
    </q-btn>
    <q-btn
      flat
      color="transparent"
      text-color="blue-10"
      class="functionBtnItem"
      :disable="selectedCardDetails.cardNumber === DUMMY_NAME"
      @click="confirmCancel = true"
    >
      <img src="../assets/icons/cancel-card.svg" class="q-mb-sm" />
      Cancel Card
    </q-btn>
  </div>
  <q-dialog v-model="confirmCancel" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete_forever" color="negative" text-color="white" />
        <span class="q-ml-sm">Are you sure you want to cancel the card?</span>
      </q-card-section>

      <q-card-actions :align="'right'">
        <q-btn flat label="Close" color="primary" v-close-popup />
        <q-btn
          flat
          label="Confirm Cancellation"
          color="negative"
          v-close-popup
          @click="cancelCard"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useAccountStore } from 'src/stores/account-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { DUMMY_NAME } from 'src/utils/helpers';

const accStore = useAccountStore();
const { toggleFreezeCard, cancelCard } = accStore;
const { selectedCardDetails } = storeToRefs(accStore);

const confirmCancel = ref(false);
</script>

<style scoped>
.functionBtnsContainer {
  border-radius: 20px 20px 0 0;
  justify-content: space-around;
  pointer-events: all;
  background: #edf3ff;
}
.deskFunctionBtnsContainer {
  border-radius: 20px 20px 20px 20px;
  justify-content: space-around;
  pointer-events: all;
  background: #edf3ff;
}
.functionBtnItem {
  max-width: 70px;
  padding: 10px 0 10px 0;
  border-radius: 10px;
  text-transform: none;
}
</style>

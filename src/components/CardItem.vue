<template>
  <div
    v-if="props.details.cardNumber !== DUMMY_NAME"
    :class="
      $q.screen.lt.md ? 'relative-position' : 'relative-position deskCardRoot'
    "
    :style="props.details.frozen ? { opacity: 0.5 } : {}"
  >
    <q-btn
      color="white"
      text-color="primary"
      class="showCardNoBtn text-caption text-weight-bold"
      @click="onToggleCardNumber"
      ><q-icon
        v-if="showCardNumber"
        name="visibility"
        size="xs"
        class="q-mr-sm"
      /><q-icon v-else name="visibility_off" size="xs" class="q-mr-sm" />{{
        showCardNumber ? 'Show' : 'Hide'
      }}
      card number</q-btn
    >
    <q-card
      :class="
        $q.screen.lt.md
          ? 'bg-primary shadow-5 cardItemContainer'
          : 'bg-primary deskCardItemContainer'
      "
    >
      <q-card-section class="q-pa-lg">
        <div class="row justify-end">
          <img src="../assets/logos/Logo-white-full.svg" />
        </div>
        <p class="text-white text-h5 text-weight-bold q-my-lg">
          {{ props.details.name }}
        </p>
        <p
          class="text-white text-body2 text-spacing-2 text-weight-bold q-mb-sm cardNumber"
        >
          <span v-if="showCardNumber" class="q-pr-lg">
            <q-icon
              v-for="n in 4"
              :key="n"
              name="circle"
              class="hiddenNumber"
            />
          </span>
          <span v-else class="q-pr-lg">{{
            props.details.cardNumber.substring(0, 4)
          }}</span>
          <span v-if="showCardNumber" class="q-pr-lg">
            <q-icon
              v-for="n in 4"
              :key="n"
              name="circle"
              class="hiddenNumber"
            />
          </span>
          <span v-else class="q-pr-lg">{{
            props.details.cardNumber.substring(4, 8)
          }}</span>
          <span v-if="showCardNumber" class="q-pr-lg">
            <q-icon
              v-for="n in 4"
              :key="n"
              name="circle"
              class="hiddenNumber"
            />
          </span>
          <span v-else class="q-pr-lg">{{
            props.details.cardNumber.substring(8, 12)
          }}</span>

          <span class="q-pr-xl">{{
            props.details.cardNumber.substring(12, 16)
          }}</span>
        </p>
        <p class="cardRow2 text-white text-bold q-mb-none">
          <span class="q-mr-lg">Thru: {{ props.details.validThru }}</span
          ><span>CVV: </span><sub class="q-pl-sm hiddenCVV">***</sub>
        </p>
        <div class="row justify-end">
          <img src="../assets/logos/Visa-Logo.svg" />
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div
    v-else
    :class="
      $q.screen.lt.md
        ? 'bg-primary text-white dummyCardContainer'
        : 'bg-primary q-mt-xl text-white dummyCardContainer'
    "
    clickable
    @click="props.setShowAddCard"
  >
    <h4>To add a new card</h4>
    <p>Click here!</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ICardDetails } from '../types/types';
import { DUMMY_NAME } from 'src/utils/helpers';

const props = defineProps<{
  details: ICardDetails;
  setShowAddCard: () => void;
}>();

const showCardNumber = ref(true);

const onToggleCardNumber = () => {
  showCardNumber.value = !showCardNumber.value;
};
</script>

<style scoped>
.dummyCardContainer {
  min-height: 220px;
  min-width: 330px;
  padding: 20px;
  border-radius: 16px;
}
.dummyCardContainer:hover {
  cursor: pointer;
}
.deskCardRoot {
  width: 100%;
  margin-top: 48px;
}
.cardItemContainer {
  border-radius: 12px;
}
.deskCardItemContainer {
  border-radius: 12px;
  width: 100%;
}
.showCardNoBtn::before {
  box-shadow: none;
}
.showCardNoBtn {
  position: absolute;
  right: 0;
  top: -30px;
  padding-bottom: 30px;
  border-radius: 6px 6px 0 0;
  text-transform: none;
}
.cardNumber {
  letter-spacing: 0.185em;
}
.hiddenNumber {
  font-size: 0.5em;
  font-weight: 400;
  line-height: 1em;
  margin-right: 0.5125em;
}
.hiddenCVV {
  font-size: 1.75em;
  line-height: 1em;
}
.cardRow2 {
  display: flex;
  align-items: flex-start;
  font-size: 0.8125rem;
  letter-spacing: 0.075em;
}
</style>

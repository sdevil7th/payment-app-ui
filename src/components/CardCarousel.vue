<template>
  <q-carousel
    v-model="selectedCard"
    :height="$q.screen.lt.md ? '350px' : '330px'"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    navigation
    :class="
      $q.screen.lt.md
        ? 'bg-transparent text-white'
        : 'q-pa-none bg-transparent text-white'
    "
    @transition="
      (newVal) => {
        setSelectedCard(newVal as string);
      }
    "
  >
    <q-carousel-slide
      v-for="cardItem in cardsToShow"
      :key="cardItem.cardNumber"
      :name="cardItem.cardNumber"
      :class="
        $q.screen.lt.md
          ? 'column no-wrap flex-center q-pa-none'
          : 'column no-wrap q-pa-none'
      "
    >
      <card-item :details="cardItem" :setShowAddCard="props.setShowAddCard" />
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { useAccountStore } from 'src/stores/account-store';
import CardItem from 'components/CardItem.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { ICardDetails } from 'src/types/types';
import { DUMMY_DATA } from 'src/constants/exampleCard';

const props = defineProps<{
  setShowAddCard: () => void;
}>();

const accStore = useAccountStore();

const { activeCards, selectedCard } = storeToRefs(accStore);
const { setSelectedCard } = accStore;

const cardsToShow = computed<ICardDetails[]>(() => [
  ...activeCards.value,
  DUMMY_DATA,
]);
</script>

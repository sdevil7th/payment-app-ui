import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import {
  DUMMY_DATA,
  EXAMPLE_CARD,
  EXAMPLE_CARD_2,
} from 'src/constants/exampleCard';
import { ICardDetails } from 'src/types/types';
import { DUMMY_NAME, generateRandomCardDetails } from 'src/utils/helpers';
import { computed, ref } from 'vue';

export const useAccountStore = defineStore('account', () => {
  const balance = ref(LocalStorage.getItem('balance') || 3000);
  const cards = ref<ICardDetails[]>(
    LocalStorage.getItem('cards')
      ? JSON.parse(LocalStorage.getItem('cards') as string)
      : [EXAMPLE_CARD, EXAMPLE_CARD_2]
  );

  const activeCards = computed(() => {
    return cards.value.filter((card) => !card.cancelled);
  });

  const selectedCard = ref<string>(
    cards.value[0].cardNumber || EXAMPLE_CARD.cardNumber
  );

  const selectedCardTxns = computed(() => {
    if (selectedCard.value === DUMMY_NAME) {
      return [];
    }
    const index = cards.value.findIndex(
      (card) => card.cardNumber === selectedCard.value
    );
    return cards.value[index].transactions;
  });

  const selectedCardDetails = computed(() => {
    if (selectedCard.value === DUMMY_NAME) {
      return DUMMY_DATA;
    }
    const index = cards.value.findIndex(
      (card) => card.cardNumber === selectedCard.value
    );
    return cards.value[index];
  });

  function setSelectedCard(cardNumber: string) {
    selectedCard.value = cardNumber;
  }

  function toggleFreezeCard() {
    if (selectedCard.value === DUMMY_NAME) {
      return;
    }
    const index = cards.value.findIndex(
      (card) => card.cardNumber === selectedCard.value
    );
    cards.value[index].frozen = !cards.value[index].frozen;
  }

  function cancelCard() {
    if (selectedCard.value === DUMMY_NAME) {
      return;
    }
    const index = cards.value.findIndex(
      (card) => card.cardNumber === selectedCard.value
    );
    cards.value[index].cancelled = true;
    const filteredActiveCards = activeCards.value.filter(
      (card) => card.cardNumber !== selectedCard.value
    );
    if (filteredActiveCards.length < 1) {
      selectedCard.value = DUMMY_NAME;
    } else {
      selectedCard.value = filteredActiveCards[0].cardNumber;
    }
  }

  function addNewCard(name: string) {
    const newCardDetails = generateRandomCardDetails(name);
    cards.value.push(newCardDetails);
  }

  return {
    balance,
    cards,
    activeCards,
    addNewCard,
    selectedCard,
    setSelectedCard,
    selectedCardTxns,
    selectedCardDetails,
    toggleFreezeCard,
    cancelCard,
  };
});
